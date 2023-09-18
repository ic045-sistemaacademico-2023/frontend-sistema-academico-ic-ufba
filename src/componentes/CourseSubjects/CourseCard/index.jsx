export default function CourseCard({ data }) {
  return (
    <a
      href={`/disciplina/${data.id}`}
      className={`flex flex-col text-center justify-center bg-primary-200 rounded w-44 h-auto py-3 hover:bg-primary-400 cursor-pointer ${
        data?.concluido ? "bg-green-100 hover:bg-green-200" : ""
      }`}
    >
      <p className="text-md font-bold text-primary-800">{data.codigo}</p>
      <p>{data.nome}</p>
    </a>
  );
}
