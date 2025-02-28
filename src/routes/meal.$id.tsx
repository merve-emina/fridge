import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { addToList, getList, incOnList } from '@/lib/localdb/api';
import { getMealById } from '@/lib/mealdb/api';
import { addToOrders } from '@/lib/store';
import { queryClient } from '@/main';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ListPlusIcon, RefrigeratorIcon } from 'lucide-react';

export const Route = createFileRoute('/meal/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const query = useQuery({
    queryKey: ['meal', id],
    queryFn: () => getMealById(id),
  });

  const listQuery = useQuery({
    queryKey: ['local', 'list'],
    queryFn: getList,
  });

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      const item = listQuery?.data?.find((elt) => elt.name === name);
      if (item) {
        await incOnList(item);
      } else {
        await addToList(name);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['local'] });
    },
  });

  const m = query.data;
  const list = listQuery.data;

  return (
    m && (
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">{m.meal}</h1>
          <Button variant="outline" onClick={() => addToOrders(m.id)}>
            Bestellen
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="basis-2/3">
            <div>
              <Table className="my-8">
                <TableCaption>Zutaten-Liste</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Einkaufsliste</TableHead>
                    <TableHead className="text-center">Kühlschrank</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {m.ingredients.filter(Boolean).map((ig) => (
                    <TableRow key={ig}>
                      <TableCell>{ig}</TableCell>
                      <TableCell className="text-center flex gap-x-2 justify-center items-center">
                        <span>
                          {list?.find((item) => item.name === ig)?.count || 0}{' '}
                          mal
                        </span>
                        <Button
                          onClick={() => mutation.mutate(ig)}
                          variant="outline"
                          size="icon"
                        >
                          <ListPlusIcon />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <RefrigeratorIcon className=" text-zinc-300" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="space-y-4">
              {m.instructions.split('\r\n').map((p, ix) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: no other possibility
                <p key={ix}>{p}</p>
              ))}
            </div>
          </div>
          <div className="basis-1/3">
            <div className="rounded-xl overflow-hidden">
              <img src={m.mealThumb} alt="Bild zum Essen" />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
