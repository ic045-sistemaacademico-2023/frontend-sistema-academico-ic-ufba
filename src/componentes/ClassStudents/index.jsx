import { useState } from "react";
import Button from "../Button";
import InputField from "../Forms/InputField";

function ClassStudents({ classStudents }) {
  const [editing, setEditing] = useState(false);
  const [nota, setNota] = useState(0);
  const [faltas, setFaltas] = useState(0);

  const resetInputs = () => {
    setNota(0);
    setFaltas(0);
  }

  const onConfirm = (student) => {
    student.nota = nota;
    student.faltas = faltas;
    setEditing(false);
    resetInputs();
  };

  const onClickEdit = (student) => {
    setNota(student.nota);
    setFaltas(student.faltas);
    setEditing(true);
  }

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
                  {student.usuario.cpf}
                </th>
                <td className="px-6 py-4">{student.usuario.nome}</td>
                <td className="px-6 py-4">{student.curso.nome}</td>
                {editing ? (
                  <>
                    <td className="px-6 py-4">
                      <InputField name="nota" value={nota} onChange={(e) => setNota(e.target.value)} />
                    </td>
                    <td className="px-6 py-4">
                      <InputField name="faltas" value={faltas} onChange={(e) => setFaltas(e.target.value)}/>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">{student?.nota}</td>
                    <td className="px-6 py-4">{student?.faltas}</td>
                  </>
                )}
                <td className="px-6 py-4">
                  <Button
                    onClick={editing ? () => onConfirm(student) : () => onClickEdit(student)}
                  >
                    {editing ? "Confirmar" : "Editar"}
                  </Button>
                </td>
              </tr>
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
