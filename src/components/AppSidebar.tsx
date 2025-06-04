import React, { useEffect, useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from './ui/sidebar';
import { sidebarMenu, NavItem } from './ui/sidebar-menu-data';

// 递归渲染多级菜单
function renderMenu(items: NavItem[], currentPath: string) {
  console.log('items',items)
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton asChild isActive={currentPath === item.path}>
            <a href={item.path}>{item.title}</a>
          </SidebarMenuButton>
          {item.children && item.children.length > 0 && (
            <div style={{ paddingLeft: 16 }}>
              {renderMenu(item.children, currentPath)}
            </div>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

const AppSidebar: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>导航</SidebarGroupLabel>
            <SidebarGroupContent>
              {renderMenu(sidebarMenu, pathname)}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AppSidebar; 