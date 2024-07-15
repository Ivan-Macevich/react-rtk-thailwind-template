import { Loader } from "../component/Loader";

export function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader />
    </div>
  );
}
