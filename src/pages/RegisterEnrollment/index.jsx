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
import api from "../../utils/api";
import { status } from "./data";
import SubjectsSelectForm from "./subjectsSelect";


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

function RegisterEnrollment() {

    const { id } = useParams();
    const isEditing = id !== undefined;
    const navigate = useNavigate();

    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinasTurmas, setDisciplinasTurmas] = useState([]);

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

        const getEnrollmentOportunity = async () => {
            try {
                const response = await api.get(`disciplina/${id}`);
                if (response.status === 200) {
                    const subject = response.data;
                    setValue("nome", subject.nome);
                    setValue("aberta", subject.aberta);
                    setValue("descricao", subject.descricao);
                    setValue("dataInicial", subject.dataInicial);
                    setValue("dataFinal", subject.dataFinal);
                }
            } catch (error) {
                console.log(error);
                toast.error("Error ao carregar dados da oportunidade");
            }
        };

        if (isEditing) {
            getEnrollmentOportunity();
        }

        getDisciplinas();

    }, [isEditing, id, setValue, watch])

    const onSubmit = async (data) => {
        data.aberta === "ABERTA"? data.aberta = true : data.aberta = false;
        console.log(data);
        if (isEditing) {
          try {
            const response = await api.put(`oportunidade/${id}`, data);
            if (response.status === 200) {
              toast.success("Oportunidade editada com sucesso!");
              navigate(`/oportunidades/${data.id}`);
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
              toast.success("Oportunidade cadastrada com sucesso!");
              navigate(`/oportunidades/${data.id}`);
            } else {
              toast.error("Error ao cadastrar Oportunidade");
            }
          } catch (error) {
            console.log(error);
            toast.error("Error ao cadastrar Oportunidade");
          }
        }
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
                <h2 className="text-base font-bold  text-left">Disciplinas</h2>
                    <SubjectsSelectForm disciplinasTurmas={disciplinasTurmas} setDisciplinasTurmas={setDisciplinasTurmas}/>
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
                <div>
                    <Button type="submit">{isEditing ? "Editar" : "Cadastrar"}</Button>
                </div>
            </form>
        </div>
    );
}

export default RegisterEnrollment;