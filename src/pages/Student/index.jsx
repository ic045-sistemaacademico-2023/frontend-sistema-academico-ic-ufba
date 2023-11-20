import StudentInfos from "../../componentes/StudentInfos";
import StudentCourses from "../../componentes/StudentCourses";
import { useEffect, useState } from "react";

import api from "../../utils/api";
import { toast } from "react-toastify";

import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from "../../componentes/Button";
import useAuth from "../../hooks/useAuth";

function handlePrint() {
  window.print();
}

function exportToPDF(studentData) {
  const doc = new jsPDF();
  const table = document.querySelector("table");

  const pdfOptions = {
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
  };

  doc.setFontSize(18);
  doc.text("Comprovante de Matrícula", pdfOptions.margin.left, 15);

  doc.setFontSize(12);
  doc.text(`Nome: ${studentData?.nome}`, pdfOptions.margin.left, 30);
  doc.text(`Matrícula: ${studentData?.matricula}`, pdfOptions.margin.left, 40);
  doc.text(`Curso: ${studentData?.curso}`, pdfOptions.margin.left, 50);
  doc.text(
    `Período de Ingresso: ${studentData?.periodoDeIngresso}`,
    pdfOptions.margin.left,
    60,
  );
  doc.text(`Currículo: ${studentData?.curriculo}`, pdfOptions.margin.left, 70);
  doc.text(`CR: ${studentData?.cr}`, pdfOptions.margin.left, 80);

  let y = pdfOptions.margin.top + 100;

  doc.autoTable({ html: table, startY: y, ...pdfOptions });

  doc.save(`Comprovante de Matrícula - ${studentData?.nome}.pdf`);
}

const currentYear = new Date().getFullYear();
const currentPeriod = new Date().getMonth() < 6 ? 1 : 2;

function StudentPage() {
  const { token } = useAuth();
  const [user, setUser] = useState();

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
  const [studentCoursesApi, setStudentCourses] = useState();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/aluno/${userId}`);
        setStudent(response.data);
      } catch (error) {
        console.log(error);
        toast.error(`Error ao carregar o aluno`);
      }
    };

    const fetchStudentCourses = async () => {
      try {
        const response = await api.get(`/turma/aluno/${userId}`);
        setStudentCourses(response.data);
      } catch (error) {
        console.log(error);
        toast.error(`Error ao carregar o turma aluno`);
      }
    };
    fetchStudent();
    fetchStudentCourses();
  }, [userId]);

  return (
    <div className="w-full pl-64">
      <div className="printable">
        <StudentInfos
          studentData={studentDataApi}
          pageTitle={
            "Comprovante de Matrícula - Período " +
            currentYear +
            "." +
            currentPeriod
          }
        />
        <StudentCourses studentCourses={studentCoursesApi} />
        <div className="mt-6">
          <Button onClick={() => exportToPDF(studentDataApi)}>Download</Button>
          <span style={{ margin: "0 8px" }}></span>
          <Button onClick={handlePrint}>Imprimir</Button>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
