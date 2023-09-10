function StudentInfos({ studentData }) {
  const currentYear = new Date().getFullYear();
  const currentPeriod = new Date().getMonth() < 6 ? 1 : 2;

  return (
    <div
      id="student-info"
      className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg"
    >
      <h1 className="text-xl text-gray-700 font-bold">
        Comprovante de Matrícula - Período {currentYear}.{currentPeriod}
      </h1>
      <dl className="grid grid-cols-3 gap-4 mt-5 ">
        <div className="flex flex-col">
          <dt className="text-sm text-gray-500">Nome:</dt>
          <dd className="text-lg font-medium text-primary-800">
            {studentData.nome}
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-sm text-gray-500">Matrícula:</dt>
          <dd className="text-lg font-medium text-primary-800">
            {studentData.matricula}
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-sm text-gray-500">Curso:</dt>
          <dd className="text-lg font-medium text-primary-800">
            {studentData.curso}
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-sm text-gray-500">Período de Ingresso:</dt>
          <dd className="text-lg font-medium text-primary-800">
            {studentData.periodoDeIngresso}
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-sm text-gray-500">Ano do Currículo:</dt>
          <dd className="text-lg font-medium text-primary-800">
            {studentData.curriculo}
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-sm text-gray-500">
            Coeficiente de Rendimento (CR):
          </dt>
          <dd className="text-lg font-medium text-primary-800">
            {studentData.cr}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default StudentInfos;
