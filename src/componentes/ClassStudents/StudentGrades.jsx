import { useState } from "react";
import InputField from "../Forms/InputField";
import Button from "../Button";
import api from "../../utils/api";
import { toast } from "react-toastify";

function StudentGrades({ student, index, turma }) {
  const [editing, setEditing] = useState(false);
  const [nota, setNota] = useState(student?.notas[0].nota);
  const [faltas, setFaltas] = useState(student?.notas[0].faltas);

  const onConfirm = async (student) => {
    student.nota = nota;
    student.faltas = faltas;
    setEditing(false);

    try {
      const response = await api.put(
        `/nota/${student.notas[0].id}/notas-e-faltas`,
        {
          nota: student.nota,
          faltas: student.faltas,
          aluno: student.id,
          turma: turma.id,
        },
      );
      if (response.status === 200) {
        toast.success("Nota e faltas atualizadas com sucesso");
      } else {
        toast.error("Erro ao atualizar nota e faltas");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar nota e faltas");
    }
  };

  const sendStudentGrade = async (student) => {
    try {
      const response = await api.post(
        `/nota/enviar/aluno/${student.id}/${turma.id}`,
      );
      if (response.status === 200) {
        toast.success("Nota enviada");
      } else {
        toast.error("Nota não enviada");
      }
    } catch (error) {
      console.error(error);
      toast.error("Nota não enviada");
    }
  };

  return (
    <tr
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
            <InputField
              name="nota"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
          </td>
          <td className="px-6 py-4">
            <InputField
              name="faltas"
              value={faltas}
              onChange={(e) => setFaltas(e.target.value)}
            />
          </td>
        </>
      ) : (
        <>
          <td className="px-6 py-4">{nota}</td>
          <td className="px-6 py-4">{faltas}</td>
        </>
      )}
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2 justify-start items-center">
          <Button
            onClick={
              editing ? () => onConfirm(student) : () => setEditing(true)
            }
          >
            {editing ? "Confirmar" : "Editar"}
          </Button>
          <Button onClick={() => sendStudentGrade(student)}>Enviar Nota</Button>
        </div>
      </td>
    </tr>
  );
}

export default StudentGrades;
