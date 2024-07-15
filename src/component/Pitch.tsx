import { Badge } from "./Badge";
import { Pitch } from "../modules/pitch";
import { AvatarPlaceholder } from "./AvatarPlaceholder";

type Props = {
  pitch: Pitch;
};
export function Pitch({ pitch }: Props) {
  const { header, link, description, user } = pitch;
// const formattedlink = ''
//
//
//     if (!/^https?:\/\//i.test(link)) {
//         url = "http://" + link;
//     }

  return (
    <article className="h-100 w-100 flex flex-col items-start justify-start gap-2 bg-white p-6">
      <div className="flex items-center gap-x-4">
        <AvatarPlaceholder size={10} profile={{ fullName: user.fullName }} />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href="#">{user.fullName}</a>
          </p>
          <p className="text-gray-600">{user.additionalInfo.role.name}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        {user.additionalInfo.genres.map((genre) => (
          <a key={genre.id} href="#" className="relative z-10 ">
            <Badge text={genre.name} />
          </a>
        ))}
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href="#">
            <span className="absolute inset-0 line-clamp-2"></span>
            {header}
          </a>
        </h3>
        <p className="mt-5 line-clamp-6 text-justify text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>

      <a
        href={link}
        target="_blank"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Learn more <span aria-hidden="true">→</span>
      </a>
      <a
        href={encodeURI(user.additionalInfo.website)}
        target="_blank"
        className="break-all text-sm font-semibold leading-6 text-gray-900"
      >
        {user.additionalInfo.website}
      </a>
    </article>
  );
}
