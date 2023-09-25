import { useParams } from "react-router-dom";

import { courseClass } from "./courseClass";
import { studentsData } from "./studentsData";

import Sidebar from "../../componentes/Sidebar";
import CourseClassInfos from "../../componentes/CourseClassInfos";
import ClassStudents from "../../componentes/ClassStudents";
import Button from "../../componentes/Button";

function CourseClassPage() {
  const { id } = useParams();
  return (
    <div className="w-full pl-64">
      <Sidebar />
      <CourseClassInfos course={courseClass} />
      <ClassStudents classStudents={studentsData} />

      <div className="py-4 mb-4">
        <Button href="/comprovante-matricula" secondary>
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default CourseClassPage;
