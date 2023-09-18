function StudentHistory({ studentHistory }) {
  return (
    <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
      <table className="w-full text-sm text-left text-gray-700 rounded-lg bg-primary-300">
        <thead className="text-xs text-gray-900 uppercase bg-primary-300 rounded-lg">
          <tr>
            <th scope="col" className="px-6 py-3">
              Período
            </th>
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
              Cred.
            </th>
            <th scope="col" className="px-6 py-3">
              Natureza
            </th>
            <th scope="col" className="px-6 py-3">
              Nota
            </th>
            <th scope="col" className="px-6 py-3">
              Result.
            </th>
          </tr>
        </thead>
        <tbody>
          {studentHistory.map((periodCourses, index) => (
            <>
              <tr className="bg-primary-200">
                <th className="px-6 py-1">{periodCourses.periodo}</th>
                <td colSpan={7}></td>
              </tr>
              {periodCourses.disciplinas.map((finishedCourse, courseIndex) => (
                <tr
                  key={index + "-" + courseIndex + "-" + finishedCourse.codigo}
                  className={`${
                    courseIndex % 2 == 0 ? "bg-white" : "bg-primary-50"
                  } border border-gray-100 hover:bg-primary-100`}
                >
                  <td className="px-6 py-4"></td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {finishedCourse.codigo}
                  </th>
                  <td className="px-6 py-4">
                    {finishedCourse.componenteCurricular}
                  </td>
                  <td className="px-6 py-4">{finishedCourse.ch}</td>
                  <td className="px-6 py-4">{finishedCourse.cr}</td>
                  <td className="px-6 py-4">{finishedCourse.natureza}</td>
                  <td className="px-6 py-4">{finishedCourse.notaFinal}</td>
                  <td className="px-6 py-4">{finishedCourse.resultado}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentHistory;
