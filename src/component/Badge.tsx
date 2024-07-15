export function Badge({ text }: { text: string }) {
  return (
    <div className="rounded-full bg-gray-50 px-3 py-1.5 font-medium capitalize text-gray-600 hover:bg-gray-100">
      {text}
    </div>
  );
}
