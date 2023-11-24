import Sidebar from "../../componentes/Sidebar";

import Button from "../../componentes/Button";
import InputField from "../../componentes/Forms/InputField";
import SelectField from "../../componentes/Forms/SelectField";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../../componentes/Forms/TextField";
import { toast } from "react-toastify";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import api from "../../utils/api";
import { status } from "./data";
import SubjectsSelectForm from "./subjectsSelect";
import { Backspace } from "@phosphor-icons/react";
import { formatDateYearMonthDay } from "../../utils/dateFormater";


const schema = yup.object().shape({
    nome: yup.string().required("O nome da oportunidade é obrigatório"),
    aberta: yup.string().required("O status da oportunidade é obrigatório"),
    descricao: yup.string().required("A descrição da oportunidade é obrigatório"),
    dataInicial: yup.date().required("A data inicial da oportunidade é obrigatório"),
    dataFinal: yup.date().required("A data final da oportunidade é obrigatório"),
});

const initialValues = {
    nome: "",
    aberta: "",
    descricao: "",
    dataInicial: "",
    dataFinal: "",
};

function RegisterEnrollmentOpportunity() {

    const { id } = useParams();
    const isEditing = id !== undefined;
    const navigate = useNavigate();
    const { token } = useAuth();

    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState([]);
    const [coordenador, setCoordenador] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        mode: "onSubmit",
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
      const fetchUser = async () => {
        if (!token) return;
  
        try {
          const response = await api.get("/user/me");
  
          if (response.status === 200) {
            let userId = response.data.id;
            const coordenadorResponse = await api.get(`/coordenador/byusuario/${userId}`);
            if(response.status === 200)
              setCoordenador(coordenadorResponse.data);
            else 
              console.log("Erro ao obter coordenador");
          } else {
            console.log("Erro ao obter usuário");
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchUser();
    }, [token]);

    useEffect(() => {
      async function getDisciplinas() {
        try {

          // if(isEditing){
          //   const selecionadas = await api.get("");
          // }

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

      getDisciplinas();
    }, []);

    useEffect(() => {
        const getEnrollmentOportunity = async () => {
            try {
                const response = await api.get(`oportunidade/${id}`);
                if (response.status === 200) {
                    setValue("nome", response.data.oportunidadeMatricula.nome);
                    setValue("aberta", response.data.oportunidadeMatricula.aberta);
                    setValue("descricao", response.data.oportunidadeMatricula.descricao);
                    setValue("dataInicial", formatDateYearMonthDay(response.data.oportunidadeMatricula.dataInicial));
                    setValue("dataFinal", formatDateYearMonthDay(response.data.oportunidadeMatricula.dataFinal));

                    if(response.data.disciplinaTurmas.length > 0){
                      const subjectClassesArray = [];
                      response.data.disciplinaTurmas.map((subjectClasses) => {
                        let subjectsArray = [];
                        subjectClasses.turmas.map((subject) => subjectsArray.push({ //turmas da disciplina
                          id: subject.id,
                          value: subject.id,
                          name: subject.code,
                        }));
                        subjectClassesArray.push({ //adiciona disciplina
                          disciplina: {
                            id: subjectClasses.disciplina.id,
                            value: subjectClasses.disciplina.id,
                            name: subjectClasses.disciplina.nome,
                          },
                          turmas: subjectsArray
                        });
                      });
                      setDisciplinasSelecionadas(subjectClassesArray);
                    }
                }
            } catch (error) {
                console.log(error);
                toast.error("Error ao carregar dados da oportunidade");
            }
        };

        if (isEditing) {
            getEnrollmentOportunity();
        }
    }, [isEditing, id, setValue, watch])

    const parseDateToTimeStamp = (date) => {
      const globalTime = new Date(date);
      return `${globalTime.getFullYear()}-${String(globalTime.getMonth() + 1).padStart(2, '0')}-${String(globalTime.getDate()).padStart(2, '0')} ${String(globalTime.getHours()).padStart(2, '0')}:${String(globalTime.getMinutes()).padStart(2, '0')}:${String(globalTime.getSeconds()).padStart(2, '0')}`;
    }

    const onSubmit = async (data) => {
        data.aberta === "ABERTA"? data.aberta = true : data.aberta = false;
        data.dataInicial = parseDateToTimeStamp(data.dataInicial);
        data.dataFinal = parseDateToTimeStamp(data.dataFinal);
        let disciplinaTurmas = disciplinasSelecionadas.map(item => ({
          disciplina: item.disciplina.id,
          turmas: item.turmas.map(turma => turma.id)
        }));
        data.disciplinaTurmas = disciplinaTurmas;
        data.coordenador = coordenador.id;
        if (isEditing) {
          try {
            const response = await api.put(`oportunidade/${id}`, data);
            if (response.status === 200) {
              toast.success("Oportunidade editada com sucesso!");
              navigate(`/oportunidades`);
            } else {
              toast.error("Error ao editar oportunidade");
            }
          } catch (error) {
            console.log(error);
            toast.error("Error ao editar Oportunidade");
          }
        } else {
          try {
            const response = await api.post(`oportunidade/`, data);
            if (response.status === 201) {
              console.log(response.data);
              toast.success("Oportunidade cadastrada com sucesso!");
              navigate(`/oportunidades`);
            } else {
              toast.error("Error ao cadastrar Oportunidade");
            }
          } catch (error) {
            console.log(error);
            toast.error("Error ao cadastrar Oportunidade");
          }
        }
    };

    const removeTurma = (idDisciplina, idTurma) => {
      let i = disciplinasSelecionadas.findIndex((d) => d.disciplina.id == idDisciplina);
      let turmas = disciplinasSelecionadas[i].turmas.filter((t) => t.id != idTurma);
      let selecionados = [...disciplinasSelecionadas];
      selecionados[i].turmas = turmas;
      if(turmas.length == 0)
        selecionados.splice(i,1);
      setDisciplinasSelecionadas(selecionados);
      setDisciplinas([...disciplinas]);
    };

    return (
        <div className="w-full pl-64">
            <Sidebar />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-primary-100 p-5 z-10 shadow-lg rounded-lg m-10 flex flex-col"
            >
                <h1 className="text-xl text-gray-700 font-bold mb-6">
                    {isEditing ? "Editar" : "Cadastrar"} Oportunidade de Matrícula
                </h1>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <InputField
                        {...register("nome")}
                        label={"Nome"}
                        type={"text"}
                        placeholder={"Nome da Oportunidade"}
                        error={errors.nome?.message}
                    />
                    <SelectField
                        {...register("aberta")}
                        label={"Status"}
                        options={status}
                        placeholder={"Selecione o status"}
                        error={errors.professor?.message}
                    />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <InputField
                        {...register("dataInicial")}
                        label={"Data Inicial"}
                        type={"date"}
                        placeholder={"Data de início"}
                        error={errors.nome?.message}
                    />
                    <InputField
                        {...register("dataFinal")}
                        label={"Data Final"}
                        type={"date"}
                        placeholder={"Data de fim"}
                        error={errors.nome?.message}
                    />
                </div>

                <div className="grid md:grid-cols-1 md:gap-6">
                    <TextField
                        {...register("descricao")}
                        label={"Descrição"}
                        type={"text"}
                        placeholder={"Descrição da oportunidade de matrícula..."}
                        error={errors.ementa?.message}
                    />
                </div>

                <div className="grid md:grid-cols-1 md:gap-6">
                  <h2 className="text-lg font-bold  text-left">Disciplinas</h2>
                  <SubjectsSelectForm disciplinas={disciplinas} disciplinasSelecionadas={disciplinasSelecionadas} setDisciplinasSelecionadas={setDisciplinasSelecionadas} />
            {
              disciplinasSelecionadas.length > 0 ?
                <div className=" flex self-start justify-self-start">
                  {disciplinasSelecionadas.map((sel) =>
                    <span key={sel.disciplina.id}>
                      <p className="font-semibold">
                        {sel.disciplina.name}
                      </p>
                      <div className="flex justify-around">
                        {sel.turmas.map((turma) =>
                          <div key={turma.id} style={
                            {
                              border: '1px solid #ccc',
                              borderRadius: '8px',
                              padding: '10px',
                              margin: '10px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                          }}>
                            <p>{turma.name}</p>
                            <button type="button" onClick={() => removeTurma(sel.disciplina.id, turma.id)}>
                              <Backspace color="red" size={20} />
                            </button>
                          </div>
                        )}
                      </div>
                    </span>
                  )}
                </div>
                :
                <></>
            }

                </div>

                <div>
                    <Button type="submit">{isEditing ? "Editar" : "Cadastrar"}</Button>
                </div>
            </form>
        </div>
    );
}

export default RegisterEnrollmentOpportunity;