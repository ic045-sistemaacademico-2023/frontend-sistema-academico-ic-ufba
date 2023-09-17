function CourseClasses({ courseClasses }) {
  const currentYear = new Date().getFullYear();
  const currentPeriod = new Date().getMonth() < 6 ? 1 : 2;

  return (
    <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
      <strong className="text-xl text-primary-600">
        Lista de turmas - Semestre {currentYear}.{currentPeriod}
      </strong>
      <table className="w-full text-sm text-left text-gray-700 mt-4">
        <thead className="text-xs text-gray-900 uppercase bg-gray-5">
          <tr>
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
        <tbody>
          {courseClasses.map((course, index) => (
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
                {course.turma}
              </th>
              <td className="px-6 py-4">{course.dias}</td>
              <td className="px-6 py-4">{course.horario}</td>
              <td className="px-6 py-4">{course.local}</td>
              <td className="px-6 py-4">{course.docente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseClasses;
