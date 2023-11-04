import { areasObject } from "./data";

function SubjectInfos({ subjectData }) {
  function createPreRequisitosMarkup() {
    return { __html: subjectData?.preRequisitos.replace(/\n/g, "<br />") };
  }

  function createEmentaMarkup() {
    return { __html: subjectData?.ementa.replace(/\n/g, "<br />") };
  }

  function createBibliografiaMarkup() {
    return { __html: subjectData?.bibliografia.replace(/\n/g, "<br />") };
  }

  function createObservacaoMarkup() {
    return { __html: subjectData?.observacao.replace(/\n/g, "<br />") };
  }

  return (
    <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
      <h1 className="text-2xl text-primary-700 font-bold mb-6 pb-2">
        Ementa da Disciplina
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-6 bg-primary-100 py-5 rounded-lg ">
        <div>
          <strong className="text-sm text-primary-600 block">
            Disciplina:
          </strong>
          <p className="text-lg font-medium text-primary-800">
            {subjectData.nome}
          </p>
        </div>
        <div>
          <strong className="text-sm text-primary-600 block">Código:</strong>
          <p className="text-lg font-medium text-primary-800">
            {subjectData.codigo}
          </p>
        </div>
        <div>
          <strong className="text-sm text-primary-600 block">
            Departamento:
          </strong>
          <p className="text-lg font-medium text-primary-800">
            {areasObject[subjectData.area]}
          </p>
        </div>
        <div>
          <strong className="text-sm text-primary-600 block">
            Carga Horária Total(CH):
          </strong>
          <p className="text-lg font-medium text-primary-800">
            {subjectData.chTotal} hrs
          </p>
        </div>
        <div>
          <strong className="text-sm text-primary-600 block">
            Carga Horária Prática:
          </strong>
          <p className="text-lg font-medium text-primary-800">
            {subjectData.chPratica} hrs
          </p>
        </div>
        <div>
          <strong className="text-sm text-primary-600 block">
            Carga Horária Teórica:
          </strong>
          <p className="text-lg font-medium text-primary-800">
            {subjectData.chTeorica} hrs
          </p>
        </div>
      </div>

      <div className="px-6 border-t-2 border-cyan-600 pt-8">
        <div className="mb-6 text-left">
          <strong className="text-xl text-primary-600">Pré-requesitos:</strong>
          <div className="text-base text-primary-700 mt-2 text-justify">
            {subjectData.preRequisitos ? (
              <div dangerouslySetInnerHTML={createPreRequisitosMarkup()} />
            ) : (
              "Dados não disponíveis"
            )}
          </div>
        </div>

        <div className="mb-6 pt-4 text-left">
          <strong className="text-xl text-primary-600">Ementa:</strong>
          <div className="text-base text-primary-700 mt-2 text-justify">
            {subjectData.ementa ? (
              <div dangerouslySetInnerHTML={createEmentaMarkup()} />
            ) : (
              "Dados não disponíveis"
            )}
          </div>
        </div>
        <div className="mb-6 text-left">
          <strong className="text-xl text-primary-600">Observação:</strong>
          <div className="text-base text-primary-700 mt-2 text-justify">
            {subjectData.observacao ? (
              <div dangerouslySetInnerHTML={createObservacaoMarkup()} />
            ) : (
              "Dados não disponíveis"
            )}
          </div>
        </div>

        <div className="mb-2 text-left pb-2">
          <strong className="text-xl text-primary-600">Bibliografia:</strong>
          <div className="text-base text-primary-700 mt-2 text-justify">
            {subjectData.bibliografia ? (
              <div dangerouslySetInnerHTML={createBibliografiaMarkup()} />
            ) : (
              "Dados não disponíveis"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectInfos;
