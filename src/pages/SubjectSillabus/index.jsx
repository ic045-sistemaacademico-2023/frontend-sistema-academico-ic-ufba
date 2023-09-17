import Sidebar from "../../componentes/Sidebar";

import { courseData } from "./data";
import { courseClasses } from "./courses";
import SubjectInfos from "../../componentes/SubjectInfos";
import CourseClasses from "../../componentes/CourseClasses";

function SubjectSillabus() {
  return (
    <div className="w-full pl-64">
      <Sidebar />

      <SubjectInfos course={courseData} />
      <CourseClasses courseClasses={courseClasses} />
    </div>
  );
}

export default SubjectSillabus;
