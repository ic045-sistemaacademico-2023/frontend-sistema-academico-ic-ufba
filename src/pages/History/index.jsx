import Sidebar from "../../componentes/Sidebar";
import StudentInfos from "../../componentes/StudentInfos";
import StudentHistory from "../../componentes/StudentHistory";

import { studentData } from "./data";
import { studentHistory } from "./history";

import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from "../../componentes/Button";

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
  doc.text("Histórico Universitário", pdfOptions.margin.left, 15);

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

  doc.save(`Historico Universitario - ${studentData.nome}.pdf`);
}

function HistoryPage() {
  return (
    <div className="w-full pl-64">
      <Sidebar />
      <StudentInfos
        studentData={studentData}
        pageTitle={"Components Curriculares Cursados"}
      />
      <StudentHistory studentHistory={studentHistory} />
      <div className="mt-6">
        <Button onClick={exportToPDF}>Download</Button>
        <Button onClick={handlePrint}>Imprimir</Button>
      </div>
    </div>
  );
}

export default HistoryPage;
