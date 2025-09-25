
'use client';

import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AlertTriangle,
  FileText,
  LayoutDashboard,
  Lightbulb,
  Settings,
  Wrench,
  PanelLeft,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { Logo } from '@/components/logo';

const navItems = [
  {
    href: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/anomalies',
    icon: AlertTriangle,
    label: 'Anomalies',
  },
  {
    href: '/maintenance',
    icon: Wrench,
    label: 'Maintenance',
  },
  {
    href: '/optimizations',
    icon: Lightbulb,
    label: 'Optimizations',
  },
  {
    href: '/reports',
    icon: FileText,
    label: 'Reports',
  },
];

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

const AppSidebar: FC = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold tracking-tight font-headline">
              AquaTrack
            </h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User" data-ai-hint={userAvatar.imageHint}/>}
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Jane Doe</span>
            <span className="text-xs text-muted-foreground">
              jane.doe@example.com
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

const Header: FC<{ pageTitle: string }> = ({ pageTitle }) => {
  const { isMobile } = useSidebar();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 md:px-8 lg:h-[60px]">
      {isMobile && <SidebarTrigger />}
      {!isMobile && <div className="w-8" />}
    </header>
  );
};

export const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        {/* <Header pageTitle="Dashboard" /> */}
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
};
