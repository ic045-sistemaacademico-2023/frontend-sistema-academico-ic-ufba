import Sidebar from "../../componentes/Sidebar";

import { courseData } from "./data";
import { courseClasses } from "./courses";
import SubjectInfos from "../../componentes/SubjectInfos";
import CourseClasses from "../../componentes/CourseClasses";
import { useParams } from "react-router-dom";
import Button from "../../componentes/Button";

function SubjectSillabus() {
  const { id } = useParams();
  return (
    <div className="w-full pl-64">
      <Sidebar />

      <SubjectInfos course={courseData} />
      <CourseClasses courseClasses={courseClasses} />
      <div className="py-4 mb-4">
        <Button href="/disciplinas" secondary>
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default SubjectSillabus;
