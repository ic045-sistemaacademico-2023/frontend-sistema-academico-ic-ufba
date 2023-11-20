import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

import StudentInfos from "../../componentes/StudentInfos";
import StudentHistory from "../../componentes/StudentHistory";
import Button from "../../componentes/Button";

import { studentHistory } from "./history";

import jsPDF from "jspdf";
import "jspdf-autotable";

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
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const studentId = 1; //while we don't have a login control system
    const fetchStudentData = async () => {
      try {
        const response = await api.get(`aluno/${studentId}`);
        setStudentData(response.data);
      } catch (error) {
        console.log("Error on fetchStudentData in HistoryPage: ", error);
        toast.error("Error ao carregar dados do estudante");
      }
    };
    fetchStudentData();
  }, []);

  return (
    studentData && (
      <div className="w-full pl-64">
        <div className="printable">
          <StudentInfos
            studentData={studentData}
            pageTitle={"Components Curriculares Cursados"}
          />
          <StudentHistory studentHistory={studentHistory} />
        </div>
        <div className="mt-6 mb-5">
          <Button onClick={() => exportToPDF(studentData)}>Download</Button>
          <span style={{ margin: "0 8px" }}></span>
          <Button onClick={handlePrint}>Imprimir</Button>
        </div>
      </div>
    )
  );
}

export default HistoryPage;
