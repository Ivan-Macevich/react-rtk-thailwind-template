import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { AppLink } from "../types";

type Props = {
  link: AppLink;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
};
export function AppNavLink({
  link,
  className,
  activeClassName = "",
  inactiveClassName = "",
}: Props) {
  const isLinkWithCallback = "callback" in link;

  return isLinkWithCallback ? (
    <div
      className={classNames("cursor-pointer", className, inactiveClassName)}
      onClick={link.callback}
    >
      {link.label}
    </div>
  ) : (
    <NavLink
      key={link.label}
      to={link.route}
      className={({ isActive }) =>
        classNames(className, isActive ? activeClassName : inactiveClassName)
      }
    >
      {link.label}
    </NavLink>
  );
}
