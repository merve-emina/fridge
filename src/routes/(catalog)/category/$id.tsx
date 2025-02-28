import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getCategories, getMealsByCategory } from '@/lib/mealdb/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/(catalog)/category/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const query = useQuery({
    queryKey: ['meal', 'cats'],
    queryFn: getCategories,
  });
  const selectedCategory = query.data?.find((c) => c.idCategory === id);

  const mealsQuery = useQuery({
    queryKey: ['meal', 'cats', selectedCategory?.idCategory],
    queryFn: () => {
      if (!selectedCategory) return [];
      return getMealsByCategory(selectedCategory.strCategory);
    },
  });

  return (
    <div>
      <h1 className="text-2xl">{selectedCategory?.strCategory}</h1>
      <div className="mt-6 grid sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {mealsQuery.data?.map((c) => (
          <Link key={c.id} to="/meal/$id" params={{ id: c.id }}>
            <Card className="rounded-lg hover:shadow-indigo-300 hover:shadow-sm hover:bg-zinc-50">
              <CardHeader>
                <CardTitle>{c.meal}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={c.mealThumb} alt="Bild zum Essen" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
