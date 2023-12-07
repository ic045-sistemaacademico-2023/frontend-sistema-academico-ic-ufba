import Button from "../Button";
import StudentGrades from "./StudentGrades";
import api from "../../utils/api";
import { toast } from "react-toastify";

function ClassStudents({ classStudents, turma }) {

  const sendStudentsGrades = async () => {
    try{
      const response = await api.post(`/nota/enviar/turma/${turma.id}`);
      if(response.status === 200){
        toast.success("Notas enviadas");
      }else{
        if(response.status === 500 && response.data.length > 0){
          toast.warning("Alguns e-mails não foram enviados");
        }else{
          toast.error("Notas não enviadas");
        }
      }
    }catch (error) {
      console.error(error);
      toast.error("Notas não enviadas");
    }
  }

  return (
    <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
      <div className="flex justify-between items-center">

        <h2 className="text-xl text-primary-700 font-bold mb-2">Alunos</h2>
        {
          classStudents && classStudents.length > 0?
            <div className="pr-5 flex  space-x-4">
            <Button onClick={() => sendStudentsGrades(classStudents)}>
              Enviar Notas
            </Button>
            </div>
          :
            <></>
        }
        
      </div>

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
              <StudentGrades
                student={student}
                index={index}
                key={index}
                turma={turma}
              />
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
