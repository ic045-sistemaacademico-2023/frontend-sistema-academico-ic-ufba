function StudentCourses({ studentCourses }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-5">
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
        <tbody>
          {studentCourses.map((course, index) => (
            <tr key={index} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {course.codigo}
              </th>
              <td className="px-6 py-4">{course.componenteCurricular}</td>
              <td className="px-6 py-4">{course.ch}</td>
              <td className="px-6 py-4">{course.turma}</td>
              <td className="px-6 py-4">{course.dias}</td>
              <td className="px-6 py-4">{course.horario}</td>
              <td className="px-6 py-4">{course.local}</td>
              <td className="px-6 py-4">{course.docente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // <div className="text-gray-700">
    //   <h2 className="text-lg font-semibold mb-2 ">Matérias Cursadas</h2>
    //   <ul>
    //     {studentCourses.map((course, index) => (
    //       <li key={index} className="mb-4">
    //         <p>
    //           <strong>Código:</strong> {course.codigo}
    //         </p>
    //         <p>
    //           <strong>Componente Curricular:</strong>{" "}
    //           {course.componenteCurricular}
    //         </p>
    //         <p>
    //           <strong>Carga Horária:</strong> {course.ch} horas
    //         </p>
    //         <p>
    //           <strong>Turma:</strong> {course.turma}
    //         </p>
    //         <p>
    //           <strong>Dia:</strong> {course.dia}
    //         </p>
    //         <p>
    //           <strong>Horário:</strong> {course.horario}
    //         </p>
    //         <p>
    //           <strong>Local:</strong> {course.local}
    //         </p>
    //         <p>
    //           <strong>Docente:</strong> {course.docente}
    //         </p>
    //         {index !== studentCourses.length - 1 && <hr className="my-2" />}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}

export default StudentCourses;
