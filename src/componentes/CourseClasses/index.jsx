function CourseClasses({ courseClasses }) {
  console.log(courseClasses);
  const currentYear = new Date().getFullYear();
  const currentPeriod = new Date().getMonth() < 6 ? 1 : 2;

  // Verifica se courseClasses é um array válido antes de mapeá-lo
  if (!Array.isArray(courseClasses)) {
    console.log("courseClasses não é um array válido");
    return (
      <strong className="text-sm text-primary-600 block p-4">
        Disciplina sem turmas cadastradas para o período
      </strong>
    );
  }

  return (
    <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
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
          {courseClasses.map((classes, index) => (
            <tr
              key={index}
              className={`${
                index % 2 == 0 ? "bg-primary-50" : "bg-primary-100"
              } border border-gray-200 hover:bg-primary-200`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {classes.id}
              </th>
              <td className="px-6 py-4">{classes.dias}</td>
              <td className="px-6 py-4">{classes.horario}</td>
              <td className="px-6 py-4">{classes.local}</td>
              <td className="px-6 py-4">{classes.professor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseClasses;
