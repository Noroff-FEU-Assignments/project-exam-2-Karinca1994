import Link from "next/link";
import { StarIcon } from "../../../constants/stylement";

export default function SearchResult({ e }) {
  return (
    <div className="hidden flex flex-colum my-1" key={e.id}>
      <div className="p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <div>
          <h2>{e.attributes.name}</h2>
          <div className="flex">
            {e.attributes.rating} <StarIcon />
          </div>
        </div>
        <div>
          <div>
            <span className="font-bold">{e.attributes.price}</span> Nok per day
          </div>
          <Link href={`/accomodation/${e.id}`}>
            <a>
              <button>SEE OFFER</button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
