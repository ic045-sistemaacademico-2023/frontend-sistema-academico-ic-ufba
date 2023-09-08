import Sidebar from "../../componentes/Sidebar";
import StudentInfos from "../../componentes/StudentInfos";
import StudentCourses from "../../StudentCourses";

import { studentData } from "./data";
import { studentCourses } from "./courses";

function StudentPage() {
  return (
    <div className="w-full pl-64">
      <Sidebar />
      <StudentInfos studentData={studentData} />
      <StudentCourses studentCourses={studentCourses} />
    </div>
  );
}

export default StudentPage;
