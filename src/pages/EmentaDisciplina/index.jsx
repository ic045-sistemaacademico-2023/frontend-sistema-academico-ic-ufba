import Sidebar from "../../componentes/Sidebar";

import { courseData } from "./data";
import { courseClasses } from "./courses";
import DisciplinaInfos from "../../componentes/DisciplinaInfos";
import CourseClasses from "../../componentes/CourseClasses";

function EmentaDisciplinaPage() {
    return (
        <div className="w-full pl-64">
            <Sidebar />
            <div className="bg-primary-50 p-1 z-10 m-4 shadow-lg rounded-lg max-w-5xl border-2">
            <DisciplinaInfos course={courseData} />
            <CourseClasses courseClasses={courseClasses} />
            </div>
        </div>
    );
}

export default EmentaDisciplinaPage;
