
import Button from "../../componentes/Button";
import MultiSelectField from "../../componentes/Forms/MultiSelectField";
import SelectField from "../../componentes/Forms/SelectField";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { Plus } from "@phosphor-icons/react";
// import { disciplinas } from "./data";

function SubjectsSelectForm({ setDisciplinasTurmas }) {

    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState([]);
    const [disciplinaSelected, setDisciplinaSelected] = useState(null);
    const [turmaSelected, setTurmaSelected] = useState(null);
    const [turmas, setTurmas] = useState([]);

    async function getDisciplinas() {
        try {
            const response = await api.get("/disciplina/all");
            if (response.status === 200) {
                const disciplinas = response.data.map((disciplina) => {
                    return {
                        id: disciplina.id,
                        value: disciplina.id,
                        name: disciplina.nome,
                    };
                });

                setDisciplinas(disciplinas);
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar disciplinas");
        }
    }

    async function getDisciplinaTurmas(id, disciplina) {
        try {
            const response = await api.get(`/turma/disciplina/${id}`);
            if (response.status === 200) {
                const turmasSelectArray = response.data.map((turma) => {
                    return {
                        id: turma.id,
                        value: turma.id,
                        name: turma.code,
                    };
                });
                setTurmas(turmasSelectArray);
            }
        } catch (error) {
            console.error(error);
            toast.error(`Erro ao carregar Turmas da disciplina ${disciplina}`);
        }
    }

    function handleTurmaChange(event){
    }

    function handleDisciplinaChange(event) {
    }

    useEffect(() => {
        async function getInitialTurmas() {
            if (disciplinas.length > 0) {
                await getDisciplinaTurmas(disciplinas[0].id, disciplinas[0].codigo)
                setDisciplinaSelected(disciplinas[0]);
                setTurmaSelected(turmas[0]);
            }
        }
        getDisciplinas();
        getInitialTurmas();
    }, [disciplinas]);

    // useEffect(() => {

    //     async function getTurmas(event) {
    //         console.log("AAAA");
    //         console.log(event.target.value);
    //     }

    // }, [])

    const addTurmaDisciplina = async (data, event) => {
        event.preventDefault();
        console.log("SUBMIT --> ");
        console.log(data);
        return false;
    };

    return (
        <div className="grid md:grid-cols-3 md:gap-2 items-center">
            <SelectField
                label={"Disciplina"}
                type={"text"}
                options={disciplinas}
                placeholder={"Disciplina"}
            />
            <SelectField
                label={"Turma"}
                options={turmas}
                placeholder={"Selecione a turma"}
                onChange={handleTurmaChange}
            />
            <div>
                <Button type="button" onClick={handleDisciplinaChange}>
                    <Plus size={20} />
                </Button>
            </div>
        </div>
    );
}

export default SubjectsSelectForm;