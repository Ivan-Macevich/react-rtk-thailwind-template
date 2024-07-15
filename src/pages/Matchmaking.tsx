import { useFindMatchmakingPitchesQuery } from "../modules/pitch";
import { Swipe } from "../component/Swipe";
import { Loading } from "./Loading";

export function Matchmaking() {
  const { data: pitches = [], isLoading } = useFindMatchmakingPitchesQuery();

  console.log(pitches);

  return isLoading ? <Loading /> : <Swipe pitches={pitches} />;
}
