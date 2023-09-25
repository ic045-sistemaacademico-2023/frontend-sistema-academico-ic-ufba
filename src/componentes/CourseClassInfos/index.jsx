function CourseClassInfos({ course }) {
  return (
    <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
      <h1 className="text-2xl text-primary-700 font-bold mb-6 pb-2">
        Informações da turma
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-6 bg-primary-100 py-5 rounded-lg">
        <div className>
          <strong className="text-sm text-primary-600 block">
            Disciplina:
          </strong>
          <p className="text-lg font-medium text-primary-800">
            {course.componenteCurricular}
          </p>
        </div>
        <div className>
          <strong className="text-sm text-primary-600 block">Código:</strong>
          <p className="text-lg font-medium text-primary-800">
            {course.codigo}
          </p>
        </div>
        <div className>
          <strong className="text-sm text-primary-600 block">Turma:</strong>
          <p className="text-lg font-medium text-primary-800">{course.turma}</p>
        </div>
        <div>
          <strong className="text-sm text-primary-600 block">Dias:</strong>
          <p className="text-lg font-medium text-primary-800">{course.dias}</p>
        </div>
        <div>
          <strong className="text-sm text-primary-600 block">Horários:</strong>
          <p className="text-lg font-medium text-primary-800">
            {course.horario}
          </p>
        </div>
        <div>
          <strong className="text-sm text-primary-600 block">Local:</strong>
          <p className="text-lg font-medium text-primary-800">{course.local}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseClassInfos;
