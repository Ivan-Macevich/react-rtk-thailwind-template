import { useSelector } from "react-redux";
import { selectUser } from "../modules/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../constants";
import { PitchForm } from "../forms/PitchForm";

export function CreatePitch() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(AppRoute.Login);
    }
  }, [navigate, user]);

  return <PitchForm />;
}
