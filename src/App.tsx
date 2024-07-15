import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks";
import { selectIsInitialized } from "./modules/config";
import { AppRoute } from "./constants";
import { NotFound } from "./pages/NotFound";
import { Private } from "./component/PrivateRoute";
import { LightShell } from "./component/LightShell";
import { Login } from "./pages/Login";
import { Loading } from "./pages/Loading";
import { AdditionalInfo } from "./pages/AdditionalInfo";
import { CreatePitch } from "./pages/CreatePitch";
import { Matchmaking } from "./pages/Matchmaking";

function App() {
  const isInitialized = useAppSelector(selectIsInitialized);

  return isInitialized ? (
    <Routes>
      <Route path={AppRoute.Root} element={<Private Component={LightShell} />}>
        <Route
          path={AppRoute.Root}
          element={<Navigate to={AppRoute.Pitches} />}
        />

        <Route path={AppRoute.CreatePitch} element={<CreatePitch />} />

        <Route path={AppRoute.Pitches} element={<Matchmaking />} />
      </Route>

      <Route path={AppRoute.AdditionalInfo} element={<AdditionalInfo />} />
      <Route path={AppRoute.Login} element={<Login />} />
      <Route path={AppRoute.NotFound} element={<NotFound />} />
      <Route path={AppRoute.Wildcard} element={<NotFound />} />
    </Routes>
  ) : (
    <Loading />
  );
}

export default App;
