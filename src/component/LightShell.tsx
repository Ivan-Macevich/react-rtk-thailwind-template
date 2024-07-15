// import classNames from "classnames";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { matchPath, NavLink, Outlet, useLocation } from "react-router-dom";
import { navigationLinks, userLinks } from "../constants";
import classNames from "classnames";
import { Navbar } from "./Navbar";
// import { AvatarPlaceholder } from "./AvatarPlaceholder";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectProfile } from "../modules/user";
import { Loading } from "../pages/Loading";
import { AppNavLink } from "./AppNavLink";
import { signOut } from "../modules/auth";

export function LightShell() {
  const { pathname } = useLocation();
  const currentRoute = navigationLinks.find((link) =>
    matchPath(link.route, pathname),
  );
  const [isOpen, setIsOpen] = useState(false);
  const profile = useAppSelector(selectProfile);

  const dispatch = useAppDispatch();
  const menuItems = [
    ...userLinks,
    { label: "Sign Out", callback: signOutCallBack },
  ];
  function signOutCallBack() {
    dispatch(signOut());
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function openMenu() {
    setIsOpen(true);
  }

  return profile ? (
    <div className="relative mx-auto flex h-screen max-w-[800px] flex-col">
      <Navbar
        page={currentRoute?.label}
        navigationLinks={navigationLinks}
        isOpen={isOpen}
        onOpenClick={openMenu}
        className="shadow"
        profile={profile}
        menuItems={menuItems}
      />

      {/* Mobile menu */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeMenu}>
          <Navbar
            page={currentRoute?.label}
            navigationLinks={navigationLinks}
            isOpen={isOpen}
            onOpenClick={openMenu}
            className="fixed top-0 z-20"
            profile={profile}
            menuItems={menuItems}
          />

          <div className="fixed inset-0 bg-black/25" />

          <div className="fixed inset-0 top-16 overflow-y-auto">
            <div className="flex">
              <Dialog.Panel className="w-full transform overflow-hidden bg-white transition-all">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigationLinks.map((link) => (
                    <NavLink
                      key={link.label}
                      to={link.route}
                      className={({ isActive }) =>
                        classNames(
                          "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
                          {
                            "border-indigo-500 bg-indigo-50 text-indigo-700":
                              isActive,
                            "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800":
                              !isActive,
                          },
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {/*<AvatarPlaceholder profile={profile} size={8} />*/}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {profile.fullName}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {profile.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    {menuItems.map((link) => {
                      return (
                        <AppNavLink
                          link={link}
                          className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        />
                      );
                    })}
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="flex flex-1 flex-col">
        <header className="hidden sm:block sm:pt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {currentRoute && (
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                {currentRoute.label}
              </h1>
            )}
          </div>
        </header>
        <main className="flex flex-1 flex-col">
          <div className="mx-auto flex w-full flex-1 flex-col pt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
