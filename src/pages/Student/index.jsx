import Sidebar from "../../componentes/Sidebar";
import StudentInfos from "../../componentes/StudentInfos";
import StudentCourses from "../../componentes/StudentCourses";

import { studentData } from "./data";
import { studentCourses } from "./courses";

import jsPDF from "jspdf";
import "jspdf-autotable";

function handlePrint() {
  const sidebar = document.querySelector(".pl-64");
  if (sidebar) {
    sidebar.classList.remove("pl-64");
  }

  window.print();

  if (sidebar) {
    sidebar.classList.add("pl-64");
  }
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
    60
  );
  doc.text(`Currículo: ${studentData.curriculo}`, pdfOptions.margin.left, 70);
  doc.text(`CR: ${studentData.cr}`, pdfOptions.margin.left, 80);

  let y = pdfOptions.margin.top + 100;

  doc.autoTable({ html: table, startY: y, ...pdfOptions });

  doc.save(`Comprovante de Matrícula - ${studentData.nome}.pdf`);
}

function StudentPage() {
  return (
    <div className="w-full pl-64">
      <Sidebar />
      <StudentInfos studentData={studentData} />
      <StudentCourses studentCourses={studentCourses} />
      <div className="mt-6">
        <button
          className="text-gray-900 focus:text-primary-400 hover:text-primary-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          onClick={exportToPDF}
        >
          Download
        </button>
        <button
          className="text-gray-900 focus:text-primary-400 hover:text-primary-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          onClick={handlePrint}
        >
          Imprimir
        </button>
      </div>
    </div>
  );
}

export default StudentPage;
