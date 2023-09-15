import CourseCard from "./CourseCard";

function CourseSubjects({ courseData }) {
  return (
    <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-900 uppercase bg-gray-5">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Semestre
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Disciplinas
            </th>
          </tr>
        </thead>
        <tbody>
          {courseData.map((semester, index) => (
            <tr
              key={index}
              className={`${
                index % 2 == 0 ? "bg-white" : "bg-primary-50"
              } border border-gray-100 hover:bg-primary-100`}
            >
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
              >
                {index + 1}
              </td>
              <td className="px-6 py-4 flex gap-5">
                {
                  semester.map((subject) => (
                     <CourseCard data={subject} key={subject.id}/>
                  ))
                }
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseSubjects;