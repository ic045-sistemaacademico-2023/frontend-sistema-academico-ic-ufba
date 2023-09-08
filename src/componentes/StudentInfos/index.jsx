function StudentInfos({ studentData }) {
  const currentYear = new Date().getFullYear();
  const currentPeriod = new Date().getMonth() < 6 ? 1 : 2;

  return (
    <div className="bg-gray-200 p-5 z-10 m-5 rounded-lg">
      <h1 className="text-xl text-gray-700 font-bold">
        Comprovante de Matrícula - Período {currentYear}.{currentPeriod}
      </h1>
      <div className="flex justify-evenly mt-5 text-left text-blue-900">
        <div className="flex flex-col font-medium">
          <h5>Nome: {studentData.nome}</h5>
          <h5>Matrícula: {studentData.matricula}</h5>
          <h5>Curso: {studentData.curso}</h5>
        </div>
        <div className="flex flex-col font-medium">
          <h5>Período de Ingresso: {studentData.periodoDeIngresso}</h5>
          <h5>Curriculo: {studentData.curriculo}</h5>
          <h5>CR: {studentData.cr}</h5>
        </div>
      </div>
    </div>
  );
}

export default StudentInfos;
