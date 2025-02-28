import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useOrderCount } from '@/lib/store';

export const Route = createRootRoute({
  component: () => {
    const orders = useOrderCount();
    return (
      <>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <div className="flex items-center justify-between">
              <SidebarTrigger />
              <span className="p-2">Bestellungen: {orders}</span>
            </div>
            <div className="p-4">
              <Outlet />
            </div>
          </main>
        </SidebarProvider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
