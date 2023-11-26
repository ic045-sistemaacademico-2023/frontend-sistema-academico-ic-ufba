import StudentGrades from "./StudentGrades";

function ClassStudents({ classStudents }) {
  return (
    <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
      <h2 className="text-xl text-primary-700 font-bold mb-2">Alunos</h2>
      {classStudents && classStudents.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-900 uppercase bg-gray-5">
            <tr>
              <th scope="col" className="px-6 py-3">
                CPF
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Curso
              </th>
              <th scope="col" className="px-6 py-3">
                Nota
              </th>
              <th scope="col" className="px-6 py-3">
                Faltas
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {classStudents?.map((student, index) => (
              <StudentGrades student={student} index={index} key={index} />
            ))}
          </tbody>
        </table>
      ) : (
        <strong className="text-sm text-primary-600 block p-4">
          Não há alunos nesta turma ainda.
        </strong>
      )}
    </div>
  );
}

export default ClassStudents;
