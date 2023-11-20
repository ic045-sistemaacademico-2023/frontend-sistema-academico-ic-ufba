function StudentCourses({ studentCourses }) {
  return (
    <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-900 uppercase bg-gray-5">
          <tr>
            <th scope="col" className="px-6 py-3">
              Código
            </th>
            <th scope="col" className="px-6 py-3">
              Componente Curricular
            </th>
            <th scope="col" className="px-6 py-3">
              CH
            </th>
            <th scope="col" className="px-6 py-3">
              Turma
            </th>
            <th scope="col" className="px-6 py-3">
              Dias
            </th>
            <th scope="col" className="px-6 py-3">
              Horários
            </th>
            <th scope="col" className="px-6 py-3">
              Local
            </th>
            <th scope="col" className="px-6 py-3">
              Docente
            </th>
          </tr>
        </thead>
        {studentCourses?.length === 0 && (
          <tbody>
            <tr className="bg-white border border-gray-100 hover:bg-primary-100">
              <td
                colSpan="8"
                className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
              >
                Nenhuma disciplina matriculada
              </td>
            </tr>
          </tbody>
        )}
        <tbody>
          {studentCourses?.map((course, index) => (
            <tr
              key={index}
              className={`${
                index % 2 == 0 ? "bg-white" : "bg-primary-50"
              } border border-gray-100 hover:bg-primary-100`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {course.disciplina.codigo}
              </th>
              <td className="px-6 py-4">{course.disciplina.nome}</td>
              <td className="px-6 py-4">{course.disciplina.chTotal}</td>
              <td className="px-6 py-4">{course.code}</td>
              <td className="px-6 py-4">{course.dias}</td>
              <td className="px-6 py-4">{course.horario}</td>
              <td className="px-6 py-4">{course.local}</td>
              <td className="px-6 py-4">{course.professor.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentCourses;
