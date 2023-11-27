function SubjectsResults({ subjectsResults }) {
  console.log(subjectsResults);
  return (
    <div className="pt-10">
      <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg overflow-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-900 uppercase bg-gray-5">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Código
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Carga Horária
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Nota
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Faltas
              </th>
            </tr>
          </thead>
          {subjectsResults?.length === 0 && (
            <tbody>
              <tr className="bg-white border text-center border-gray-100 hover:bg-primary-100 h-full">
                <td
                  colSpan="5"
                  className="px-6 py-4 h-full text-gray-500 text-center"
                >
                  Nenhuma disciplina cursada
                </td>
              </tr>
            </tbody>
          )}
          <tbody>
            {subjectsResults?.map((nota, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 == 0 ? "bg-white" : "bg-primary-50"
                } border text-center border-gray-100 hover:bg-primary-100 h-full`}
              >
                <td className="px-6 py-4 h-full">{nota.disciplina.codigo}</td>
                <td className="px-6 py-4 h-full">{nota.disciplina.nome}</td>
                <td className="px-6 py-4 h-full">{nota.disciplina.chTotal}</td>
                <td className="px-6 py-4 h-full">{nota.nota}</td>
                <td className="px-6 py-4 h-full">{nota.faltas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubjectsResults;
