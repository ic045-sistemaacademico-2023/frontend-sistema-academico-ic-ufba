import Sidebar from "../../componentes/Sidebar";
import CourseSubjects from "../../componentes/CourseSubjects";

import { courseData } from "./data";

function StudentPage() {
  return (
    <div className="w-full pl-64">
      <Sidebar />
      <CourseSubjects courseData={courseData} />
    </div>
  );
}

export default StudentPage;
