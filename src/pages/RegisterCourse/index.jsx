import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../componentes/Button";
import InputField from "../../componentes/Forms/InputField";
import SelectField from "../../componentes/Forms/SelectField";
import { turnos } from "./data";
import api from "../../utils/api";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  coordenador: yup.number().required("O coordenador do curso é obrigatório"),
  turno: yup.string().required("O turno é obrigatório"),
  semestre: yup.string().required("O semestre é obrigatório"),
});

const initialValues = {
  nome: "",
  turno: "",
  semestre: "",
};

function RegisterCourse() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const { id } = useParams();
  const isEditing = id !== undefined;

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const fetchCourse = async () => {
        try {
          const response = await api.get(`/curso/${id}`);
          if (response.status === 200) {
            const course = response.data;
            setValue("nome", course.nome);
            setValue("semestre", course.semestre);
            setValue("coordenador", course.coordenadorDeCurso.id);
            setValue("turno", course.turno);
          }
        } catch (error) {
          console.log(error);
          toast.error("Erro ao carregar dados do curso");
        }
      };
      fetchCourse();
    }
  }, [isEditing, id, setValue]);

  const [coordenadores, setCoordenadores] = useState([]);

  useEffect(() => {
    const fetchCoordenador = async () => {
      try {
        const response = await api.get(`/coordenador/all`);

        if (response.status == 200) {
          const coordenadores = response.data.map((coordenador) => {
            return {
              id: coordenador.id,
              value: parseInt(coordenador.id),
              name: coordenador.nome,
            };
          });
          setCoordenadores(coordenadores);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error ao carregar dados dos coordenadores");
      }
    };
    fetchCoordenador();
  }, []);

  const onSubmit = async (data) => {
    if (isEditing) {
      try {
        const response = await api.put(`/curso/${id}`, data);
        if (response.status === 200) {
          toast.success("Curso atualizado com sucesso!");
          navigate("/cursos");
        } else {
          toast.error("Erro ao atualizar curso");
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao atualizar curso");
      }
    } else {
      try {
        const response = await api.post("/curso/", data);
        if (response.status === 201) {
          toast.success("Turma cadastrada com sucesso!");
          navigate("/cursos");
        } else {
          toast.error("Erro ao cadastrar turma");
        }
      } catch (error) {
        console.log(error);
        toast.error("Erro ao cadastrar curso!");
      }
    }
  };

  return (
    <div className="w-full pl-64">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-primary-100 p-5 z-10 shadow-lg rounded-lg m-10 flex flex-col"
      >
        <h1 className="text-xl text-gray-700 font-bold mb-6">
          {isEditing ? "Editar" : "Cadastrar"} Curso
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            {...register("nome")}
            label={"Nome"}
            type={"text"}
            placeholder={"Nome do Curso"}
            error={errors.nome?.message}
          />
          <InputField
            {...register("semestre")}
            label={"Semestre"}
            placeholder={"Semestre"}
            error={errors.semestre?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <SelectField
            {...register("coordenador")}
            label={"Coordenador do Curso"}
            options={coordenadores}
            placeholder={"Selecione o coordenador do curso"}
            error={errors.coordenador?.message}
          />
          <SelectField
            {...register("turno")}
            label={"Turno"}
            options={turnos}
            placeholder={"Selecione o turno"}
            error={errors.turno?.message}
          />
        </div>
        <div>
          <Button type="submit">{isEditing ? "Editar" : "Cadastrar"}</Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterCourse;
