export default function CourseCard({ data }) {
  return (
    <div
      className={`flex flex-col text-center justify-center bg-primary-200 rounded w-44 h-auto py-3 hover:bg-primary-400 cursor-pointer ${
        data?.concluido ? "bg-green-100 hover:bg-green-200" : ""
      }`}
    >
      <p className="text-lg">{data.codigo}</p>
      <p>{data.nome}</p>
    </div>
  );
}
