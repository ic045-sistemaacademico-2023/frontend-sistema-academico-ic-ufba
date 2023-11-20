import Sidebar from "../../componentes/Sidebar";

import Button from "../../componentes/Button";
import InputField from "../../componentes/Forms/InputField";
import SelectField from "../../componentes/Forms/SelectField";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../../componentes/Forms/TextField";
import { toast } from "react-toastify";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { status } from "./data";


const schema = yup.object().shape({
    nome: yup.string().required("O nome da oportunidade é obrigatório"),
    // status: yup.string().required("O status da oportunidade é obrigatório").resolve(),
    status: yup.boolean().required("O status da oportunidade é obrigatório"),
    descricao: yup.string().required("A descrição da oportunidade é obrigatório"),
    dataInicial: yup.date().required("A data inicial da oportunidade é obrigatório"),
    dataFinal: yup.date().required("A data final da oportunidade é obrigatório"),
});

const initialValues = {
    nome: "",
    status: "Fechada",
    descricao: "",
    dataInicial: "",
    dataFinal: "",
};

function RegisterEnrollment() {

    const { id } = useParams();
    const isEditing = id !== undefined;
    const navigate = useNavigate();

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

        const getEnrollmentOportunity = async () => {
            try {
                const response = await api.get(`disciplina/${id}`);
                if (response.status === 200) {
                    const subject = response.data;
                    setValue("nome", subject.nome);
                    setValue("status", subject.status);
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
    }, [isEditing, id, setValue, watch])

    const onSubmit = async (data) => {
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
                        {...register("status")}
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


                <div>
                    <Button type="submit">{isEditing ? "Editar" : "Cadastrar"}</Button>
                </div>
            </form>
        </div>
    );
}

export default RegisterEnrollment;