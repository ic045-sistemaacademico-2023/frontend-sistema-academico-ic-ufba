import { Link } from "react-router-dom";

export default function CourseCard({ data }) {
  return (
    <Link
      to={`/disciplina/${data.codigo}`}
      className={`flex flex-col text-center justify-center bg-primary-200 rounded w-44 h-auto py-3 hover:bg-primary-400 cursor-pointer
      }`}
    >
      <p className="text-md font-bold text-primary-800">{data.codigo}</p>
      <p>{data.nome}</p>
    </Link>
  );
}
