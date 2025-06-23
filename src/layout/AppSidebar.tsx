"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  Dashboard,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  Building2,
  UsersRound,
  ClipboardPen,
  Inbox,
  MessageSquare
} from "../icons/index";

type Role = "jethire-admin" | "admin" | "manager" | "recruiter";

type SubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
  roles?: Role[];
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  roles?: Role[];
  subItems?: SubItem[];
};

const navItems: NavItem[] = [
  {
    icon: <Dashboard />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <UsersRound />,
    name: "Utilizadores",
    roles: ["jethire-admin"],
    path: "/users",
  },
  {
    icon: <Inbox />,
    name: "Caixa de entrada",
    roles: ["jethire-admin"],
    path: "/inbox",
  },
  {
    icon: <Building2 />,
    name: "Editar empresa",
    roles: ["admin", "manager", "recruiter"],
    path: "/company/edit",
  },
  {
    icon: <MessageSquare />,
    name: "Chat",
    roles: ["admin", "manager", "recruiter"],
    path: "/chat",
  },
  {
    icon: <Building2 />,
    name: "Empresas",
    roles: ["jethire-admin", "admin"],
    subItems: [
      {
        name: "Lista",
        path: "/company/list",
        roles: ["jethire-admin", "admin"],
      },
      {
        name: "Registos",
        path: "/company/requests",
        roles: ["jethire-admin", "admin"],
      },
    ],
  },
  {
    icon: <UsersRound />,
    name: "Equipa",
    roles: ["admin", "manager", "recruiter"],
    subItems: [
      { name: "Ver equipa", path: "/team/list" },
      { name: "+ Adicionar", path: "/team/add" },
    ],
  },
  {
    icon: <ClipboardPen />,
    name: "Ofertas",
    roles: ["admin", "manager", "recruiter"],
    subItems: [
      { name: "Ver ofertas", path: "/offer/list" },
      { name: "+ Adicionar", path: "/offer/add" },
    ],
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
    roles: ["jethire-admin", "admin", "manager"],
  },
  {
    name: "Forms",
    icon: <ListIcon />,
    roles: ["jethire-admin", "admin", "manager", "recruiter"],
    subItems: [{ name: "Form Elements", path: "/form-elements" }],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    roles: ["jethire-admin", "admin"],
    subItems: [{ name: "Basic Tables", path: "/basic-tables" }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    roles: ["jethire-admin", "admin"],
    subItems: [
      { name: "Blank Page", path: "/blank" },
      { name: "404 Error", path: "/error-404" },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    roles: ["jethire-admin", "admin"],
    subItems: [
      { name: "Line Chart", path: "/line-chart" },
      { name: "Bar Chart", path: "/bar-chart" },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    roles: ["jethire-admin", "admin"],
    subItems: [
      { name: "Alerts", path: "/alerts" },
      { name: "Avatar", path: "/avatars" },
      { name: "Badge", path: "/badge" },
      { name: "Buttons", path: "/buttons" },
      { name: "Images", path: "/images" },
      { name: "Videos", path: "/videos" },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    roles: ["jethire-admin", "admin"],
    subItems: [
      { name: "Sign In", path: "/signin" },
      { name: "Sign Up", path: "/signup" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const { data: session } = useSession();

  const role = session?.user?.role as Role;

  const hasAccess = (roles?: Role[]) => {
    if (!roles) return true;
    return roles.includes(role);
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems
        .filter((nav) => hasAccess(nav.roles))
        .map((nav, index) => {
          const visibleSubItems = nav.subItems?.filter((sub) =>
            hasAccess(sub.roles || nav.roles)
          );

          return (
            <li key={nav.name}>
              {visibleSubItems?.length ? (
                <button
                  onClick={() => handleSubmenuToggle(index, menuType)}
                  className={`menu-item group ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "menu-item-active"
                      : "menu-item-inactive"
                  } cursor-pointer ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "lg:justify-start"
                  }`}
                >
                  <span
                    className={`${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <ChevronDownIcon
                      className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                        openSubmenu?.type === menuType &&
                        openSubmenu?.index === index
                          ? "rotate-180 text-brand-500"
                          : ""
                      }`}
                    />
                  )}
                </button>
              ) : (
                nav.path && (
                  <Link
                    href={nav.path}
                    className={`menu-item group ${
                      isActive(nav.path)
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <span
                      className={`${
                        isActive(nav.path)
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    >
                      {nav.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text">{nav.name}</span>
                    )}
                  </Link>
                )
              )}
              {visibleSubItems?.length &&
                (isExpanded || isHovered || isMobileOpen) && (
                  <div
                    ref={(el) => {
                      subMenuRefs.current[`${menuType}-${index}`] = el;
                    }}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      height:
                        openSubmenu?.type === menuType &&
                        openSubmenu?.index === index
                          ? `${subMenuHeight[`${menuType}-${index}`]}px`
                          : "0px",
                    }}
                  >
                    <ul className="mt-2 space-y-1 ml-9">
                      {visibleSubItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.path}
                            className={`menu-dropdown-item ${
                              isActive(subItem.path)
                                ? "menu-dropdown-item-active"
                                : "menu-dropdown-item-inactive"
                            }`}
                          >
                            {subItem.name}
                            <span className="flex items-center gap-1 ml-auto">
                              {subItem.new && (
                                <span className="menu-dropdown-badge">new</span>
                              )}
                              {subItem.pro && (
                                <span className="menu-dropdown-badge">pro</span>
                              )}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </li>
          );
        })}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) setOpenSubmenu(null);
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) =>
      prev && prev.type === menuType && prev.index === index
        ? null
        : { type: menuType, index }
    );
  };

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !role) return null;

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo-icon.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-icon-dark.svg"
                alt="Logo"
                width={32}
                height={32}
              />
            </>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Others" : <HorizontaLDots />}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
