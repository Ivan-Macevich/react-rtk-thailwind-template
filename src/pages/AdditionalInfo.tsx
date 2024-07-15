import { AdditionalInfoForm } from "../forms/AdditionalInfoForm";
import {
  useFindAdditionalInfoQuery,
  useFindGenresQuery,
  useFindRolesQuery,
} from "../modules/pitch";
import { Loading } from "./Loading";
import { useSelector } from "react-redux";
import { selectUser } from "../modules/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../constants";

export function AdditionalInfo() {
  const { data: additionalInfo, isLoading: isAdditionalInfoLoading } =
    useFindAdditionalInfoQuery();
  const { data: roles = [], isLoading: areRolesLoading } = useFindRolesQuery();
  const { data: genres = [], isLoading: areGenresLoading } =
    useFindGenresQuery();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(AppRoute.Login);
    }
  }, [navigate, user]);

  return areGenresLoading || areRolesLoading || isAdditionalInfoLoading ? (
    <Loading />
  ) : (
    <AdditionalInfoForm
      genres={genres}
      roles={roles}
      additionalInfo={additionalInfo}
    />
  );
}
