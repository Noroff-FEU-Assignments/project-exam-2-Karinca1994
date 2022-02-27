import Link from "next/link";

export const Button = ({ children, type, onClick }) => (
  <button className="px-4 bg-gray-200 rounded" type={type} onClick={onClick}>
    {children}
  </button>
);
export const Button2 = ({ children, type }) => (
  <button
    className="bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-700 hover:border-transparent rounded-md"
    type={type}
  >
    {children}
  </button>
);
export const ButtonLink = ({ link, children }) => (
  <button className="inline-block px-8 py-3 bg-gray-200 text-black-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
    <Link href={link}>
      <a className="button">{children}</a>
    </Link>
  </button>
);
export const ButtonLink2 = ({ link, children }) => (
  <button className="absolute top-20 right-4 flex justify-center items-center p-3.5 bg-white rounded-full">
    <Link href={link}>
      <a className="button">{children}</a>
    </Link>
  </button>
);
export const ButtonModal = ({ children, type, name }) => {
  return (
    <button
      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      type={type}
    >
      <a href={`#${name}`} data-target="#modal-booking">
        {children}
      </a>
    </button>
  );
};
export const ButtonFile = ({ children, type }) => {
  return (
    <button
      className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
      type={type}
    >
      {children}
    </button>
  );
};
