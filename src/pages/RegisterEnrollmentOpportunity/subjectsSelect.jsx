import Button from "../../componentes/Button";
import SelectField from "../../componentes/Forms/SelectField";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Plus } from "@phosphor-icons/react";

function SubjectsSelectForm({
  disciplinas,
  disciplinasSelecionadas,
  setDisciplinasSelecionadas,
}) {
  const [disciplinaSelected, setDisciplinaSelected] = useState(null);
  const [turmaSelected, setTurmaSelected] = useState(null);
  const [turmas, setTurmas] = useState([]);

  function handleTurmaChange(event) {
    let id = event.target.value;
    for (let turma of turmas) {
      if (turma.id == id) {
        setTurmaSelected(turma);
      }
    }
  }

  function handleDisciplinaChange(event) {
    let id = event.target.value;
    for (let disciplina of disciplinas) {
      if (disciplina.id == id) {
        setDisciplinaSelected(disciplina);
      }
    }
  }

  useEffect(() => {
    async function getTurmas() {
      try {
        const response = await api.get(
          `/turma/disciplina/${disciplinaSelected.id}`,
        );
        if (response.status === 200) {
          const turmasSelectArray = response.data.map((turma) => {
            return {
              id: turma.id,
              value: turma.id,
              name: turma.code,
            };
          });
          setTurmas(turmasSelectArray);
          setTurmaSelected(turmasSelectArray[0]);
        }
      } catch (error) {
        console.error(error);
        toast.error(
          `Erro ao carregar Turmas da disciplina ${disciplinaSelected.codigo}`,
        );
      }
    }
    if (disciplinaSelected != null) getTurmas();
  }, [disciplinaSelected]);

  useEffect(() => {
    async function getInitialTurmas() {
      //Carrega as turmas da primeira disciplina
      if (disciplinas.length > 0) {
        try {
          const response = await api.get(
            `/turma/disciplina/${disciplinas[0].id}`,
          );
          if (response.status === 200) {
            const turmasSelectArray = response.data.map((turma) => {
              return {
                id: turma.id,
                value: turma.id,
                name: turma.code,
              };
            });
            setDisciplinaSelected(disciplinas[0]);
            setTurmas(turmasSelectArray);
            setTurmaSelected(turmasSelectArray[0]);
          }
        } catch (error) {
          console.error(error);
          toast.error(
            `Erro ao carregar Turmas da disciplina ${disciplinas[0].codigo}`,
          );
        }
      }
    }
    if (disciplinas != null && disciplinas.length > 0) getInitialTurmas();
  }, [disciplinas]);

  const addTurmaDisciplina = () => {
    if (disciplinasSelecionadas.length > 0) {
      let i = disciplinasSelecionadas.findIndex(
        (d) => d.disciplina.id == disciplinaSelected.id,
      );
      if (i == -1) {
        setDisciplinasSelecionadas(
          disciplinasSelecionadas.concat({
            disciplina: disciplinaSelected,
            turmas: [turmaSelected],
          }),
        );
      } else {
        let disciplinaI = {
          disciplina: disciplinasSelecionadas[i].disciplina,
          turmas: disciplinasSelecionadas[i].turmas.concat(turmaSelected),
        };
        let selecionadas = disciplinasSelecionadas.filter(
          (s) => s.disciplina.id != disciplinaSelected.id,
        );
        selecionadas.push(disciplinaI);
        setDisciplinasSelecionadas(selecionadas);
      }
    } else {
      setDisciplinasSelecionadas([
        {
          disciplina: disciplinaSelected,
          turmas: [turmaSelected],
        },
      ]);
    }
    //Remove turma selecionada da lista de turmas para seleção
    let turmasDisponiveis = turmas.filter((t) => t.id != turmaSelected.id);
    setTurmas(turmasDisponiveis);
    setTurmaSelected(
      turmasDisponiveis.length > 0 ? turmasDisponiveis[0] : null,
    );
    console.log(disciplinasSelecionadas);
  };

  return (
    <div className="grid md:grid-cols-3 md:gap-2 items-center">
      <SelectField
        label={"Disciplina"}
        type={"text"}
        options={disciplinas}
        placeholder={"Disciplina"}
        onChange={handleDisciplinaChange}
      />
      <SelectField
        label={"Turma"}
        options={turmas}
        placeholder={"Selecione a turma"}
        onChange={handleTurmaChange}
      />
      <div>
        {turmaSelected != null ? (
          <Button
            type="button"
            onClick={addTurmaDisciplina}
            disabled={turmaSelected == null}
          >
            <Plus size={20} />
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SubjectsSelectForm;
