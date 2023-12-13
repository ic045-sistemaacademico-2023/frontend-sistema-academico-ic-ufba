import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import api from "../../utils/api";
import Button from "../../componentes/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RoomsPage() {
  const { token } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await api.get("/user/me");

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.log("Erro ao obter usuário");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [token]);

  const [roomsObj, setRooms] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/turma/salas");
      setRooms(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error ao carregar dados das salas");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="w-full pl-64">
      <h2 className="text-xl text-gray-700 font-bold mt-4">Salas</h2>
      <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
        <table className="w-full text-sm text-center text-gray-700">
          <thead className="text-xs text-gray-900 uppercase bg-gray-5">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nº Sala
              </th>
              <th scope="col" className="px-6 py-3">
                Local
              </th>
              <th scope="col" className="px-6 py-3">
                Andar
              </th>
            </tr>
          </thead>
          <tbody>
            {roomsObj.map((room) => (
              <tr className="bg-gray-50 border border-gray-100 hover:bg-primary-100 whitespace-nowrap text-sm text-gray-900">
                <td className="px-6 py-4">{room[5] + room[6] + room[7]}</td>
                <td className="px-6 py-4">
                  {room[0] + room[1] + room[2] + room[3]}
                </td>
                <td className="px-6 py-4">{room[5] + "º Andar"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
