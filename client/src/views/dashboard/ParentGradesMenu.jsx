import { useState, useEffect } from 'react';

function ParentGradesMenu({ loggedUser }) {
    const [gradesArray, setGradesArray] = useState({});
    const [studentCourses, setStudentCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const responseID = await fetch(`http://localhost:4000/student_id/${loggedUser.parent_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (responseID.ok) {
                    const dataID = await responseID.json();
                    const responseCoursesID = await fetch(`http://localhost:4000/courses/${dataID.student_id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (responseCoursesID.ok) {
                        const tempData = await responseCoursesID.json();
                        const coursesID = tempData.map(enrollment => enrollment.course_id);
                        for (const element of coursesID) {
                            const responseGrades = await fetch(`http://localhost:4000/grades/${dataID.student_id}/${element}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });
                            if (responseGrades.ok) {
                                const dataGrades = await responseGrades.json();
                                setGradesArray(gradesArray => ({ ...gradesArray, [element]: dataGrades }));
                            } else {
                                console.log(`Response is not okay for course ID ${element}`);
                            }
                        }
                        const responseStudentCourses = await fetch(`http://localhost:4000/courses/${dataID.student_id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        if (responseStudentCourses.ok) {
                            const dataStudentCourses = await responseStudentCourses.json();
                            console.log("kursy:")
                            console.log(dataStudentCourses);
                            setStudentCourses(dataStudentCourses);
                        } else {
                            console.log("Response for student courses is not okay");
                        }
                    } else {
                        console.log("Response for courses is not okay");
                    }
                } else {
                    console.log("Response for student ID is not okay");
                }
            } catch (error) {
                console.error("Error during fetch:", error);
            }
        }
        fetchData();
    }, [loggedUser.parent_id]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <div className="w-2/3 h-3/5 bg-slate-50 p-6 rounded-md">
                <div>
                    <h1><span className="border-b text-4xl font-semibold"><span className="text-violet-500">{loggedUser.name} {loggedUser.surname}</span>'s kid's grades:</span></h1>
                </div>
                <div className="flex flex-col w-full h-full">
                    {Array.isArray(studentCourses) && studentCourses.map((course, index) => (
                        <div key={index}>
                            <h2 className="text-violet-700 text-2xl border-b capitalize">{course.course.name}</h2>
                            <div>
                                {gradesArray[course.course_id] &&
                                    gradesArray[course.course_id].map((grade, index) => (
                                        <span key={index} className='mr-1'>
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

export default ParentGradesMenu;