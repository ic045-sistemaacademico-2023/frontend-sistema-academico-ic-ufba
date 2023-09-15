export default function CourseCard({ data }) {
  return (
    <div className="flex flex-col text-center justify-center bg-primary-200 rounded w-52 h-28 hover:bg-primary-400 cursor-pointer">
      <p>{data.codigo}</p>
      <p>{data.nome}</p>
    </div>
  )
}
