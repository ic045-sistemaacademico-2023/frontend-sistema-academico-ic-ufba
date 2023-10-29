import Sidebar from "../../componentes/Sidebar";
import StudentInfos from "../../componentes/StudentInfos";
import StudentCourses from "../../componentes/StudentCourses";
import { useEffect, useState } from "react";

import { studentData } from "./data";
import { studentCourses } from "./courses";
import api from "../../utils/api";
import { toast } from "react-toastify";

import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from "../../componentes/Button";

function handlePrint() {
  window.print();
}

function exportToPDF() {
  const doc = new jsPDF();
  const table = document.querySelector("table");

  const pdfOptions = {
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
  };

  doc.setFontSize(18);
  doc.text("Comprovante de Matrícula", pdfOptions.margin.left, 15);

  doc.setFontSize(12);
  doc.text(`Nome: ${studentData.nome}`, pdfOptions.margin.left, 30);
  doc.text(`Matrícula: ${studentData.matricula}`, pdfOptions.margin.left, 40);
  doc.text(`Curso: ${studentData.curso}`, pdfOptions.margin.left, 50);
  doc.text(
    `Período de Ingresso: ${studentData.periodoDeIngresso}`,
    pdfOptions.margin.left,
    60,
  );
  doc.text(`Currículo: ${studentData.curriculo}`, pdfOptions.margin.left, 70);
  doc.text(`CR: ${studentData.cr}`, pdfOptions.margin.left, 80);

  let y = pdfOptions.margin.top + 100;

  doc.autoTable({ html: table, startY: y, ...pdfOptions });

  doc.save(`Comprovante de Matrícula - ${studentData.nome}.pdf`);
}

const currentYear = new Date().getFullYear();
const currentPeriod = new Date().getMonth() < 6 ? 1 : 2;

function StudentPage() {
  // var studentId = 1;

  // const [student, setStudent] = useState();
  // const [studentCourses, setStudentCourses] = useState();

  // useEffect(() => {
  //   const fetchStudent = async () => {
  //     try {
  //       const response = await api.get(`/aluno/${studentId}`);
  //       setStudent(response.data);
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(`Error ao carregar o aluno ${studentId}`);
  //     }
  //   };
  //   const fetchStudentCourses = async () => {
  //     try {
  //       const response = await api.get(`/turma/aluno?id=${studentId}`);
  //       setStudentCourses(response.data);
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(`Error ao carregar o turma aluno ${studentId}`);
  //     }
  //   };
  //   fetchStudent();
  //   fetchStudentCourses();
  // }, [studentId]);

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <div className="printable">
        <StudentInfos
          studentData={studentData}
          pageTitle={
            "Comprovante de Matrícula - Período " +
            currentYear +
            "." +
            currentPeriod
          }
        />
        <StudentCourses studentCourses={studentCourses} />
        <div className="mt-6">
          <Button onClick={exportToPDF}>Download</Button>
          <Button onClick={handlePrint}>Imprimir</Button>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
