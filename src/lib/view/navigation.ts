import { navItems } from "../../data/navigation";
import { basePath, withBase } from "../urls";

export interface HeaderNavItem {
  href: string;
  label: string;
  current: boolean;
}

const rootHref = basePath ? `${basePath}/` : "/";

export const isCurrentPath = (href: string, pathname: string): boolean => {
  const fullHref = withBase(href);
  return fullHref === rootHref ? pathname === rootHref : pathname.startsWith(fullHref);
};

export const headerNavItems = (pathname: string): HeaderNavItem[] =>
  navItems.map((item) => ({
    href: withBase(item.href),
    label: item.nav,
    current: isCurrentPath(item.href, pathname),
  }));
