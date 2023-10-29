function SubjectInfos({ course }) {
  return (
    <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
      <h1 className="text-2xl text-primary-700 font-bold mb-6 pb-2">
        Ementa da Disciplina
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-6 bg-primary-100 py-5 rounded-lg">
        <div className>
          <strong className="text-sm text-primary-600 block">
            Disciplina:
          </strong>
          <p className="text-lg font-medium text-primary-800">{course.nome}</p>
        </div>
        <div className>
          <strong className="text-sm text-primary-600 block">Código:</strong>
          <p className="text-lg font-medium text-primary-800">
            {course.codigo}
          </p>
        </div>
        <div className>
          <strong className="text-sm text-primary-600 block">
            Departamento:
          </strong>
          <p className="text-lg font-medium text-primary-800">
            {course.departamento}
          </p>
        </div>
        <div>
          <strong className="text-sm text-primary-600 block">
            Carga Horária Total(CH):
          </strong>
          <p className="text-lg font-medium text-primary-800">
            {course.ch} hrs
          </p>
        </div>
        <div>
          <strong className="text-sm text-primary-600 block">
            Carga Horária Prática:
          </strong>
          <p className="text-lg font-medium text-primary-800">
            {course.chPratica} hrs
          </p>
        </div>
        <div>
          <strong className="text-sm text-primary-600 block">
            Carga Horária Teórica:
          </strong>
          <p className="text-lg font-medium text-primary-800">
            {course.chTeorica} hrs
          </p>
        </div>
      </div>

      <div className="px-6">
        <div className="mb-6 pt-4 border-t-2 text-left">
          <strong className="text-xl text-primary-600">Ementa:</strong>
          <p className="text-base text-primary-700 mt-2 text-justify">
            {course.ementa}
          </p>
        </div>

        <div className="mb-6 text-left">
          <strong className="text-xl text-primary-600">Objetivos:</strong>
          <p className="text-base text-primary-700 mt-2 text-justify">
            {course.objetivos}
          </p>
        </div>

        <div className="mb-6 text-left">
          <strong className="text-xl text-primary-600">Conteúdo:</strong>
          {course.conteudo &&
            course.conteudo.split("\n").map((item, i) => (
              <p
                className="text-base text-primary-700 mt-2 text-justify"
                key={i}
              >
                {item}
              </p>
            ))}
        </div>

        <div className="mb-2 text-left pb-2">
          <strong className="text-xl text-primary-600">Bibliografia:</strong>
          {course.bibliografia &&
            course.bibliografia.split("\n").map((item, i) => (
              <p
                className="text-base text-primary-700 mt-2 text-justify"
                key={i}
              >
                {item}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SubjectInfos;
