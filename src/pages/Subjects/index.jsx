import Sidebar from "../../componentes/Sidebar";
import CourseSubjects from "../../componentes/CourseSubjects";

import { courseSubjects } from "../../utils/subjects";

function StudentPage() {
  return (
    <div className="w-full pl-64">
      <Sidebar />
      <CourseSubjects courseData={courseSubjects} />
    </div>
  );
}

export default StudentPage;
