import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import api from "../../utils/api";

export default function RoomsPage() {
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
      <div className=" bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
        <table className="w-full text-sm text-center text-gray-700">
          <tbody>
            {roomsObj.map((room) => (
              <tr className="bg-gray-50 border border-gray-100 hover:bg-primary-100 whitespace-nowrap text-sm text-gray-900">
                <td className="text-base text-gray-700 px-6 py-4">{room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
