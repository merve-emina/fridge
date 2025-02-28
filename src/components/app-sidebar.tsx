import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
    useSidebar,
  } from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { FoldersIcon, HomeIcon, SearchIcon } from "lucide-react"
  
  export function AppSidebar() {
    const { setOpenMobile } = useSidebar();

    return (
      <Sidebar >
        <SidebarHeader>
            <span className="text-xl font-medium">Fridge</span>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
                        <Link to="/"><HomeIcon /> Home</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
                        <Link to="/category"><FoldersIcon /> Kategorie</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
                        <Link to="/filter"><SearchIcon /> Filter</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
        <SidebarRail />
      </Sidebar>
    )
  }
  