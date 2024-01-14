import { useState, useEffect } from "react";

function GradesMenu({ loggedUser, studentCourses, studentCoursesID }) {

    const [studentGrades, setStudentGrades] = useState("")
    const [gradesArray, setGradesArray] = useState({})

    useEffect(() => {
        async function fetchStudentGrades() {
            try {
                for (const element of studentCoursesID) {
                    const response = await fetch(`http://localhost:4000/grades/${loggedUser.student_id}/${element}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setGradesArray(gradesArray => ({ ...gradesArray, [element]: data }))
                    } else {
                        console.log(`Response is not okay for course ID ${element}`);
                    }
                }
            } catch (error) {
                console.log("GET didn't work", error);
            }
        }
        fetchStudentGrades();
    }, [loggedUser.student_id, studentCoursesID.array]);

    useEffect(() => {
        console.log(gradesArray)
    }, [gradesArray])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <div className="w-2/3 h-3/5 bg-slate-50 p-6 rounded-md">
                <div>
                    <h1><span className=" border-b text-4xl font-semibold"><span className=" text-violet-500"> {loggedUser.name} {loggedUser.surname}</span>'s grades:</span></h1>
                </div>
                <div className="flex flex-col w-full h-full">
                    {studentCourses.map((course, index) => (
                        <div key={index}>
                            <h2 className="text-violet-700 text-2xl border-b capitalize">{course.course.name}</h2>
                            <div>
                                {gradesArray[course.course_id] &&
                                    gradesArray[course.course_id].map((grade, index) => (
                                        <span key={index}>
                                            {grade.grade}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GradesMenu;