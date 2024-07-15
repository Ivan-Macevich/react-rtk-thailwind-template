import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Role, selectUser } from "../modules/auth";
import { hasAccess } from "../utils";
import isEmpty from "is-empty-typed";
import { AppRoute } from "../constants";

type Props = {
  Component: React.ComponentType;
  role?: Role | Role[];
  restrictedRole?: Role | Role[];
};

export function Private({
  Component,
  role = Role.USER,
  restrictedRole = [],
}: Props) {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to={AppRoute.Login} />;
  } else {
    if (!user.isRegistrationFinished) {
      return <Navigate to={AppRoute.AdditionalInfo} />;
    }
    return hasAccess(user, role) &&
      (isEmpty(restrictedRole) || !hasAccess(user, restrictedRole)) ? (
      <Component />
    ) : (
      <Navigate to={AppRoute.Wildcard} />
    );
  }
}
