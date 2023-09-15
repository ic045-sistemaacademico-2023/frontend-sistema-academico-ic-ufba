function DisciplinaInfos({ course }) {
    return (
        <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
            <h1 className="text-2xl text-primary-700 font-bold mb-6 border-b pb-2">
                Ementa da Disciplina
            </h1>

            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className>
                    <strong className="text-sm text-primary-600 block">Disciplina:</strong>
                    <p className="text-lg font-medium text-primary-800">{course.componenteCurricular}</p>
                </div>
                <div className>
                    <strong className="text-sm text-primary-600 block">Código:</strong>
                    <p className="text-lg font-medium text-primary-800">{course.codigo}</p>
                </div>
                <div className>
                    <strong className="text-sm text-primary-600 block">Departamento:</strong>
                    <p className="text-lg font-medium text-primary-800">{course.departamento}</p>
                </div>
                <div >
                    <strong className="text-sm text-primary-600 block">Carga Horária Prática:</strong>
                    <p className="text-lg font-medium text-primary-800">{course.chPratica} hrs</p>
                </div>
                <div>
                    <strong className="text-sm text-primary-600 block">Carga Horária (CH):</strong>
                    <p className="text-lg font-medium text-primary-800">{course.ch} hrs</p>
                </div>
                <div>
                    <strong className="text-sm text-primary-600 block">Carga Horária Teórica:</strong>
                    <p className="text-lg font-medium text-primary-800">{course.chTeorica} hrs</p>
                </div>
            </div>

            <div className="mb-6">
                <strong className="text-sm text-primary-600">Ementa:</strong>
                <p className="text-lg text-primary-700 mt-2">{course.ementa}</p>
            </div>

            <div className="mb-6">
                <strong className="text-sm text-primary-600">Bibliografia:</strong>
                <p className="text-lg text-primary-700 mt-2">{course.bibliografia.join(", ")}</p>
            </div>

            <div className="mb-6">
                <strong className="text-sm text-primary-600">Conteúdo:</strong>
                <p className="text-lg text-primary-700 mt-2">{course.conteudo}</p>
            </div>
        </div>
    );
}

export default DisciplinaInfos;