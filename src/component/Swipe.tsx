import { useState } from "react";
import { Pitch } from "./Pitch";
import { HandThumbDownIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useArrayRef } from "../hooks";
import { useListState } from "../hooks";
import { Empty } from "./Empty";
import { Pitch as PitchType } from "../modules/pitch";

type Direction = "left" | "right";

type Props = {
  pitches: PitchType[];
};

export function Swipe({ pitches }: Props) {
  const [liking, setLiking] = useState(false);
  const [disliking, setDisliking] = useState(false);
  const { get, refCallback } = useArrayRef<string, HTMLDivElement>();
  const [statePitches, pitchHandlers] = useListState(pitches);

  function showReaction(dir: Direction) {
    if (dir === "right") {
      setLiking(true);
      setTimeout(() => {
        setLiking(false);
      }, 1000);
    } else {
      setDisliking(true);
      setTimeout(() => {
        setDisliking(false);
      }, 1000);
    }
  }

  function swipe(dir: Direction, id: string) {
    const transitionClass =
      dir === "left" ? "-translate-x-full" : "translate-x-full";
    const node = get(id);
    node?.classList.add(transitionClass);
    showReaction(dir);
    node?.addEventListener("transitionend", () => {
      pitchHandlers.pop();
    });
  }

  function like(id: string) {
    swipe("right", id);
  }

  function dislike(id: string) {
    swipe("left", id);
  }

  return (
    <div className="relative flex flex-1 flex-col gap-6 pb-6">
      {liking && (
        <HeartIcon className="absolute top-1/4 z-20 animate-ping text-gray-800 animate-once sm:top-0" />
      )}
      {disliking && (
        <HandThumbDownIcon className="absolute top-1/4 z-20 animate-ping text-red-500 animate-once sm:top-0" />
      )}

      <div className="relative flex flex-1 flex-col overflow-hidden">
        {statePitches.map((pitch) => (
          <div
            key={pitch.id}
            ref={(node) => refCallback(pitch.id, node)}
            className="absolute z-10 h-full bg-white shadow transition duration-1000 ease-in-out "
          >
            <Pitch pitch={pitch} />
          </div>
        ))}

        <Empty />
      </div>
      <div className="relative flex justify-center gap-2 px-4">
        <button
          onClick={() => dislike(statePitches[statePitches.length - 1].id)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border-0 bg-red-500 px-6 py-3 text-lg text-white hover:bg-red-600 focus:outline-none"
        >
          <HandThumbDownIcon className="h-6 w-6" aria-hidden="true" />
          Nope
        </button>

        <button
          onClick={() => like(statePitches[statePitches.length - 1].id)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border-0 bg-gray-800 px-6 py-3 text-lg text-white hover:bg-gray-900 focus:outline-none"
        >
          <HeartIcon className="h-6 w-6" aria-hidden="true" />
          Connect
        </button>
      </div>
    </div>
  );
}
