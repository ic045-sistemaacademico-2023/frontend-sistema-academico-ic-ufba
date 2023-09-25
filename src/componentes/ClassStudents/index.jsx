import Button from "../Button";

function ClassStudents({ classStudents }) {
  return (
    <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-900 uppercase bg-gray-5">
          <tr>
            <th scope="col" className="px-6 py-3">
              Matrícula
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
          {classStudents.map((student, index) => (
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
                {student.matricula}
              </th>
              <td className="px-6 py-4">{student.nome}</td>
              <td className="px-6 py-4">{student.curso}</td>
              <td className="px-6 py-4">{student.nota}</td>
              <td className="px-6 py-4">{student.faltas}</td>
              <td className="px-6 py-4">
                <Button>Editar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassStudents;
