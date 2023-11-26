import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../componentes/Button";
import api from "../../utils/api";

import { roleFilterOptions, roles } from "./data";
import { roleShowByPageOptions } from "./data";
import SelectField from "../Forms/SelectField";
import InputField from "../Forms/InputField";
import { ArrowDown, ArrowUp, ArrowsDownUp } from "@phosphor-icons/react";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import { useEffect } from 'react';
import { set } from "react-hook-form";

function UserTable({ users, isManager = false, fetchUsers, pageTitle = "" }) {
  const [searchString, setSearchString] = useState("");
  const [searchRole, setSearchRole] = useState("ALL");
  const [sortByName, setSortByName] = useState(null);

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/user/${id}`);
      if (response.status === 204) {
        toast.success("Usuário deletado com sucesso!");
        fetchUsers();
      } else {
        toast.error("Erro ao deletar usuário");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar usuário");
    }
  };

  const approveUser = async (id) => {
    try {
      const response = await api.put(`/user/approve/${id}`);
      if (response.status === 200) {
        toast.success("Usuário aprovado com sucesso!");
        fetchUsers();
      } else {
        toast.error("Erro ao aprovar usuário");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao aprovar usuário");
    }
  };

  const denyUser = async (id) => {
    try {
      const response = await api.put(`/user/reprove/${id}`);
      if (response.status === 200) {
        toast.success("Usuário recusado com sucesso!");
        fetchUsers();
      } else {
        toast.error("Erro ao recusar usuário");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao recusar usuário");
    }
  };

  function normalizeString(value = "") {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }

  function filterListSelectUser() {
    return users.filter((userInfo) => {
      const searchLowerCase = normalizeString(searchString);
      const nameLowerCase = normalizeString(userInfo.nome);
      return (
        nameLowerCase.includes(searchLowerCase) ||
        userInfo.cpf.includes(searchLowerCase)
      );
    });
  }
  let filteredUsersList =
    searchString.length > 0 ? filterListSelectUser() : users;

  function filterListSelectRole() {
    return filteredUsersList.filter((userInfo) => {
      return searchRole == "ALL" || userInfo.role == searchRole;
    });
  }

  filteredUsersList = filterListSelectRole();

  const [showByPage, setShowByPage] = useState(0);
  const [showUp, setShowUp] = useState(0);
  const [showDown, setShowDown] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (showByPage == 0) {
      setShowUp(filteredUsersList.length);
    } else {
      setShowUp(showDown + showByPage);
    }
  }, [filteredUsersList, showByPage, showDown]);

  function filterListSelectShowByPage() {
    if (showByPage == 0)
      setShowUp(Number(filteredUsersList.length));
    else
      setShowUp(Number(showDown) + Number(showByPage));
  }

  useEffect(() => {
    filterListSelectShowByPage();
  }, [showByPage]);

  function NextPage() {
    if (showUp < filteredUsersList.length) {
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

  function sortUserByName() {
    if (sortByName == null) return;
    filteredUsersList.sort((user1, user2) => {
      if (sortByName) return user1.nome.localeCompare(user2.nome);
      return user1.nome.localeCompare(user2.nome) * -1;
    });
  }

  sortUserByName();

  return (
    <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-700 font-bold ml-5">{pageTitle}</h1>
        <div className="pr-5 flex justify-end space-x-4">
          <SelectField
            id={"showByPageOptions"}
            placeholder={"Selecione"}
            label={"Mostar por página"}
            options={roleShowByPageOptions}
            onChange={(e) => {
              setShowByPage(Number(e.target.value))
              setShowDown(0)
              setPageNumber(1)
            }}
          />
          <SelectField
            id={"searchInputRoleUserScreen"}
            placeholder={"Selecionar cargo"}
            label={"Selecionar cargo"}
            options={roleFilterOptions}
            onChange={(e) => setSearchRole(e.target.value)}
          />
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
              Cargo
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        {filteredUsersList?.length === 0 && (
          <tbody>
            <tr className="bg-white border border-gray-100 hover:bg-primary-100">
              <td
                colSpan="5"
                className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
              >
                Nenhum usuário encontrado
              </td>
            </tr>
          </tbody>
        )}
        <tbody>
          {filteredUsersList.slice(showDown, showUp).map((user, index) => (
            <tr
              key={index}
              className={`${index % 2 == 0 ? "bg-white" : "bg-primary-50"
                } border border-gray-100 hover:bg-primary-100`}
            >
              <td className="px-6 py-4 h-full">{user.cpf}</td>
              <td className="px-6 py-4 h-full">
                {truncateString(user.nome, 20)}
              </td>
              <td className="px-6 py-4 h-full">
                {truncateString(user.email, 25)}
              </td>
              <td className="px-6 py-4 h-full">
                {truncateString(roles[user.role], 20)}
              </td>
              {isManager ? (
                <td className="px-6 py-4 h-full">
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    <Button onClick={() => approveUser(user.id)}>
                      Aprovar
                    </Button>
                    <Button secondary onClick={() => denyUser(user.id)}>
                      Recusar
                    </Button>
                  </div>
                </td>
              ) : (
                <td className="px-6 py-4 h-full">
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    <Button secondary href={`/atualizar/usuario/${user.id}`}>
                      Editar
                    </Button>
                    <Button onClick={() => deleteUser(user.id)}>Deletar</Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>     

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
            <div className="pr-3 pl-3"><p>Página {pageNumber}</p></div>
          )}
       
        {showUp < filteredUsersList.length && (
            <div
              className="pr-3 pl-3 cursor-pointer"
              onClick={() =>
                NextPage()
              }>
              <FaRegArrowAltCircleRight size={30} color="#1a84a0" />
            </div>
            )}
      </div>

    </div>
  );
}

export default UserTable;
