import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { getRandomMeal } from '@/lib/mealdb/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { InfoIcon } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const query = useQuery({ queryKey: ['meal', 'rnd'], queryFn: getRandomMeal });
  return (
    <Link to="/meal/$id" params={{ id: query.data?.id || '' }}>
      <Card className="w-[320px]">
        {query.data && (
          <>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{query.data.meal}</span>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <InfoIcon />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Similique modi, a cumque amet velit nobis ipsa dolorum
                    facere non possimus, dolorem obcaecati dicta aliquam
                    reprehenderit. Quo autem quae eum suscipit!
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img src={query.data.mealThumb} alt="Bild zum Essen" />
            </CardContent>
          </>
        )}
      </Card>
    </Link>
  );
}
