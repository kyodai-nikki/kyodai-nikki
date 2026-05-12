import { navItems } from "../../data/navigation";
import { basePath, withBase } from "../urls";

export interface HeaderNavItem {
  href: string;
  label: string;
  current: boolean;
}

const rootHref = basePath ? `${basePath}/` : "/";

const stripBasePath = (pathname: string): string => {
  if (!basePath || !pathname.startsWith(basePath)) return pathname;
  return pathname.slice(basePath.length) || "/";
};

const firstPathSegment = (pathname: string): string =>
  stripBasePath(pathname).split("/").filter(Boolean)[0] ?? "";

export const isCurrentPath = (href: string, pathname: string): boolean => {
  const fullHref = withBase(href);
  if (fullHref === rootHref) return pathname === rootHref;
  return firstPathSegment(href) === firstPathSegment(pathname);
};

export const headerNavItems = (pathname: string): HeaderNavItem[] =>
  navItems.map((item) => ({
    href: withBase(item.href),
    label: item.nav,
    current: isCurrentPath(item.href, pathname),
  }));
