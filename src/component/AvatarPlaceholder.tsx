type Props = {
  size: 6 | 8 | 10 | 12 | 14;
  profile: { fullName: string };
};
export function AvatarPlaceholder({ size, profile }: Props) {
  const textSizes: Record<typeof size, string> = {
    [6]: "text-xs",
    [8]: "text-sm",
    [10]: "text-md",
    [12]: "text-lg",
    [14]: "text-xl",
  };
  const textSize = textSizes[size];
  const initials = profile.fullName
    ?.split(" ")
    .reduce((acc, curr) => acc + curr[0], "");

  return (
    <span
      className={`inline-flex h-${size} w-${size} items-center justify-center rounded-full bg-gray-500`}
    >
      <span className={`${textSize} font-medium leading-none text-white`}>
        {initials}
      </span>
    </span>
  );
}
