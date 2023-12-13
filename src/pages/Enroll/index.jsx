import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Button from "../../componentes/Button";
import { ArrowDown, ArrowUp, ArrowsDownUp } from "@phosphor-icons/react";
import {
    FaRegArrowAltCircleLeft,
    FaRegArrowAltCircleRight,
} from "react-icons/fa";
import InputField from "../../componentes/Forms/InputField";

export default function Enroll() {
    const { opid, turmaid } = useParams();

    const [studentList, setStudentList] = useState([]);
    const [classData, setClassData] = useState({});
    const [searchString, setSearchString] = useState("");
    const [showByPage, setShowByPage] = useState(0);
    const [showUp, setShowUp] = useState(0);
    const [showDown, setShowDown] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [sortByName, setSortByName] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getClassAndStudentsData = async () => {
            try {
                let response = await api.get(`/oportunidade/${opid}`);
                const coordinator = response.data.oportunidadeMatricula.coordenador;
                response = await api.get(`/curso/bycoordenador/${coordinator.id}`);
                const course = response.data;
                response = await api.get(`/aluno/bycurso/${course.id}`);
                setStudentList(response.data);
                try {
                    response = await api.get(`/turma/${turmaid}`);
                    setClassData(response.data);
                } catch (error) {
                    console.log(error);
                    toast.error("Erro ao carregar dados dos alunos");
                }
            } catch (error) {
                console.log(error);
                toast.error("Erro ao carregar dados dos alunos");
            }
        };
        getClassAndStudentsData();
    }, [opid, turmaid]);

    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + "...";
    };

    let filteredStudentsList =
      searchString.length > 0 ? filterListSelectUser() : studentList;

    useEffect(() => {
        if (showByPage == 0) {
          setShowUp(filteredStudentsList.length);
        } else {
          setShowUp(showDown + showByPage);
        }
      }, [filteredStudentsList, showByPage, showDown]);
    

      function filterListSelectShowByPage() {
        if (showByPage == 0) setShowUp(Number(filteredStudentsList.length));
        else setShowUp(Number(showDown) + Number(showByPage));
      }

    useEffect(() => {
        filterListSelectShowByPage();
    }, [showByPage]);

    function NextPage() {
        if (showUp < filteredStudentsList.length) {
            setShowDown(Number(showUp));
            setShowUp(Number(showUp) + Number(showByPage));
            setPageNumber(pageNumber + 1);
        }
    }

    function PreviousPage() {
        if (showDown > 0) {
            setShowUp(Number(showDown));
            setShowDown(Number(showDown) - Number(showByPage));
            setPageNumber(pageNumber - 1);
        }
    }

    function sortStudentByName() {
        if (sortByName == null) return;
        filteredStudentsList.sort((student1, student2) => {
            if (sortByName) return student1.nome.localeCompare(student2.nome);
            return student1.nome.localeCompare(student2.nome) * -1;
        });
    }

    function normalizeString(value = "") {
        return value
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "");
    }

    function filterListSelectUser() {
        return studentList.filter((studentInfo) => {
          const searchLowerCase = normalizeString(searchString);
          const nameLowerCase = normalizeString(studentInfo.nome);
          return (
            nameLowerCase.includes(searchLowerCase) ||
            studentInfo.usuario.cpf.includes(searchLowerCase)
          );
        });
      }

    sortStudentByName();

    async function enrollStudent(studentId){
        try{
            const response = await api.post(`/solicitacao-matricula/matricular/${studentId}/${opid}/${turmaid}`);
            if(response.status == 200){
                toast.success("Aluno matriculado");
                navigate(-1);
            }else{
                toast.error("Não foi possível matricular o aluno")
            }
        }catch (error) {
            console.log(error);
            toast.error("Não foi possível matricular o aluno");
        }
    }   

    return (
        <div className="w-full pl-64">
            <div className="pt-10">
                <h2 className="text-xl text-gray-700 font-bold mt-4">
                    Matricular aluno
                </h2>
                <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
                    {classData.disciplina && (
                        <>
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl text-gray-700 ml-5">{`${classData.disciplina.codigo} - ${classData.code}`}</h3>
                                <div className="pr-5 flex justify-end space-x-4">
          <InputField
            type="text"
            label="Filtrar usuário"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder={"Nome ou CPF"}
            id={"searchInputUsersScreen"}
          />
        </div>
                            </div>
                            <table className="w-full text-sm text-center text-gray-700">
                                <thead className="text-xs text-gray-900 uppercase bg-gray-5">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            CPF
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 cursor-pointer"
                                            onClick={() =>
                                                sortByName == null
                                                    ? setSortByName(true)
                                                    : setSortByName((state) => !state)
                                            }
                                        >
                                            <span className="flex justify-center items-center gap-2">
                                                Nome {sortByName == null && <ArrowsDownUp />}
                                                {sortByName && <ArrowUp />}
                                                {sortByName == false && <ArrowDown />}
                                            </span>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        </th>
                                    </tr>
                                </thead>
                                {filteredStudentsList?.length === 0 && (
                                    <tbody>
                                        <tr className="bg-white border border-gray-100 hover:bg-primary-100">
                                            <td
                                                colSpan="5"
                                                className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                                            >
                                                Nenhum aluno do curso encontrado
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                                <tbody>
                                    {filteredStudentsList.slice(showDown, showUp).map((student, index) => (
                                        <tr
                                            key={index}
                                            className={`${index % 2 == 0 ? "bg-white" : "bg-primary-50"
                                                } border border-gray-100 hover:bg-primary-100`}
                                        >
                                            <td className="px-6 py-4 h-full">{student.usuario.cpf}</td>
                                            <td className="px-6 py-4 h-full">
                                                {truncateString(student.nome, 20)}
                                            </td>
                                            <td className="px-6 py-4 h-full">
                                                {truncateString(student.usuario.email, 25)}
                                            </td>
                                            <td className="px-6 py-4 h-full">
                                                <div className="flex flex-wrap justify-center items-center gap-2">
                                                <Button secondary onClick={()=> enrollStudent(student.id)}>
                                                    Matricular
                                                </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )
                    }


                    <div className="flex justify-end items-center p-6">
                        {pageNumber !== 1 && (
                            <div
                                className="pr-3 pl-3 cursor-pointer"
                                onClick={() => PreviousPage()}
                            >
                                <FaRegArrowAltCircleLeft size={30} color="#1a84a0" />
                            </div>
                        )}

                        {showByPage !== 0 && (
                            <div className="pr-3 pl-3">
                                <p>Página {pageNumber}</p>
                            </div>
                        )}

                        {showUp < filteredStudentsList.length && (
                            <div className="pr-3 pl-3 cursor-pointer" onClick={() => NextPage()}>
                                <FaRegArrowAltCircleRight size={30} color="#1a84a0" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="py-4 mb-4">
                <Button onClick={() => navigate(-1)} secondary>
                    Voltar
                </Button>
            </div>
        </div>
    );
}
