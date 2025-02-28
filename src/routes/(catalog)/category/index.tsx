import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategories } from '@/lib/mealdb/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/(catalog)/category/')({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery({
    queryKey: ['meal', 'cats'],
    queryFn: getCategories,
  });

  return (
    <div>
      <h1 className="text-2xl">Unsere Kategorien</h1>
      <div className="mt-6 grid sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {query.data?.map((c) => (
          <Link
            key={c.idCategory}
            to="/category/$id"
            params={{ id: c.idCategory }}
          >
            {' '}
            <Card className="rounded-lg hover:shadow-indigo-300 hover:shadow-sm hover:bg-zinc-50">
              <CardHeader>
                <CardTitle>{c.strCategory}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={c.strCategoryThumb} alt="Bild zur Kategorie" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
