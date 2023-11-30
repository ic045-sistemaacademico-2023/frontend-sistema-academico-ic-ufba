import StudentInfos from "../../componentes/StudentInfos";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../utils/api";
import { toast } from "react-toastify";

import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from "../../componentes/Button";
import useAuth from "../../hooks/useAuth";
import { status } from "../../componentes/UsersTable/data";

function handlePrint() {
  window.print();
}

function exportToPDF(studentData) {
  const doc = new jsPDF();
  const table = document.querySelector("table");
  const table2 = document.getElementById("table2");

  const pdfOptions = {
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
  };

  doc.setFontSize(18);
  doc.text(
    "Comprovante de Solicitação de Matrícula",
    pdfOptions.margin.left,
    15,
  );

  doc.setFontSize(12);
  doc.text(`Nome: ${studentData?.nome}`, pdfOptions.margin.left, 30);
  doc.text(
    `Matrícula: ${studentData?.solicitacaoMatricula?.status}`,
    pdfOptions.margin.left,
    40,
  );
  doc.text(`Curso: ${studentData?.curso?.nome}`, pdfOptions.margin.left, 50);
  doc.text(
    `Período de Ingresso: ${studentData?.periodo_ingresso}`,
    pdfOptions.margin.left,
    60,
  );
  doc.text(
    `Currículo: ${studentData?.curso?.periodo_curriculo}`,
    pdfOptions.margin.left,
    70,
  );
  doc.text(`CR: ${studentData?.cr}`, pdfOptions.margin.left, 80);

  let y = pdfOptions.margin.top + 100;
  let x = pdfOptions.margin.top + 130;

  doc.autoTable({ html: table, startY: y, ...pdfOptions });

  doc.autoTable({ html: table2, startY: x, ...pdfOptions });

  doc.save(
    `Comprovante de Solicitação de Matrícula - ${studentData?.nome}.pdf`,
  );
}

const currentYear = new Date().getFullYear();
const currentPeriod = new Date().getMonth() < 6 ? 1 : 2;

function EnrollmentProof() {
  const { token } = useAuth();
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await api.get("/user/me");

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.log("Erro ao obter usuário");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [token]);

  const userId = user?.id;

  const [studentDataApi, setStudent] = useState();
  const [studentCoursesApi, setStudentCourses] = useState([]);

  const fetchStudentCourses = async (studentId) => {
    try {
      if (!studentId) return;
      const response = await api.get(
        `/turma/comprovante-solicitacao-matricula/${studentId}`,
      );
      if (response.status === 200) {
        setStudentCourses(response.data);
      } else {
        toast.error(`Este aluno não possui solicitação de matrícula em aberto`);
        navigate("/solicitacao-de-matricula");
      }
    } catch (error) {
      toast.error(`Este aluno não possui solicitação de matrícula em aberto`);
      navigate("/solicitacao-de-matricula");
    }
  };

  useEffect(() => {
    const fetchStudent = async () => {
      let studentId = null;
      try {
        if (!userId) return;
        const response = await api.get(`/aluno/${userId}`);
        studentId = response.data.id;
        setStudent(response.data);
      } catch (error) {
        console.log(error);
        toast.error(`Error ao carregar o aluno`);
      }
      return studentId;
    };

    const fetchStudentAndCoursesAwaitData = async () => {
      const studentId = await fetchStudent();
      fetchStudentCourses(studentId);
    };
    fetchStudentAndCoursesAwaitData();
  }, [userId]);

  return (
    <div className="w-full pl-64">
      <div className="printable">
        <StudentInfos
          studentData={studentDataApi}
          pageTitle={
            "Comprovante de Solicitação de Matrícula - Período " +
            currentYear +
            "." +
            currentPeriod
          }
        />
        <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
          <table className="w-full text-sm text-left text-gray-800 ">
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
                  Sala
                </th>
                <th scope="col" className="px-6 py-3">
                  Docente
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            {studentCoursesApi?.length === 0 && (
              <tbody>
                <tr className="bg-white border border-gray-100 hover:bg-primary-100">
                  <td
                    colSpan="9"
                    className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                  >
                    Não há solicitação de matrícula em aberto
                  </td>
                </tr>
              </tbody>
            )}
            <tbody>
              {studentCoursesApi?.map((solicitacaoTurma, index) => (
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
                    {solicitacaoTurma.turma.disciplina.codigo}
                  </th>
                  <td className="px-6 py-4 max-w-[8rem] truncate">
                    {solicitacaoTurma.turma.disciplina.nome}
                  </td>
                  <td className="px-6 py-4">
                    {solicitacaoTurma.turma.disciplina.chTotal}
                  </td>
                  <td className="px-6 py-4 max-w-[10rem] truncate">
                    {solicitacaoTurma.turma.code}
                  </td>
                  <td className="px-6 py-4">
                    {solicitacaoTurma.turma.dias
                      .split(",")
                      .map((dia, index) => {
                        return <div key={index}>{dia} </div>;
                      })}
                  </td>
                  <td className="px-6 py-4">
                    {solicitacaoTurma.turma.horario
                      .split("/")
                      .map((horario, index) => {
                        return <div key={index}>{horario} </div>;
                      })}
                  </td>
                  <td className="px-6 py-4">{solicitacaoTurma.turma.sala}</td>
                  <td className="px-6 py-4">
                    {solicitacaoTurma.turma.professor.nome}
                  </td>
                  <td className="px-6 py-4">
                    {status[solicitacaoTurma.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
          <h2 className="text-lg font-bold text-center">Legendas</h2>
          <table
            id="table2"
            className="w-full text-sm text-center text-gray-700"
          >
            <thead className="text-xs text-gray-900 uppercase bg-gray-5">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Legenda
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 border border-gray-100 hover:bg-primary-100 whitespace-nowrap text-sm text-gray-900">
                <td className="px-6 py-4">Aguardando Aprovação</td>
                <td className="px-6 py-4">
                  O aluno realizou a solicitação de matrícula e está aguardando
                  o resultado.
                </td>
              </tr>
              <tr className="bg-gray-50 border border-gray-100 hover:bg-primary-100 whitespace-nowrap text-sm text-gray-900">
                <td className="px-6 py-4">Aprovado</td>
                <td className="px-6 py-4">
                  A solicitão de matrícula do aluno foi aceita pela coordenação.
                </td>
              </tr>
              <tr className="bg-gray-50 border border-gray-100 hover:bg-primary-100 whitespace-nowrap text-sm text-gray-900">
                <td className="px-6 py-4">Reprovado</td>
                <td className="px-6 py-4">
                  A solicitação de matrícula do aluno foi negada pela
                  coordenação.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Button onClick={() => exportToPDF(studentDataApi)}>Download</Button>
          <span style={{ margin: "0 8px" }}></span>
          <Button onClick={handlePrint}>Imprimir</Button>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentProof;
