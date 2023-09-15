import DisciplinaEmenta from "../../componentes/DisciplinaInfos";
import Sidebar from "../../componentes/Sidebar";

import { courseData } from "./data";
import DisciplinaInfos from "../../componentes/DisciplinaInfos";

function EmentaDisciplinaPage() {
    return (
        <div className="w-full pl-64">
            <Sidebar />
            <DisciplinaInfos course={courseData} />
        </div>
    );
}

export default EmentaDisciplinaPage;
