import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

function TeacherViewStudentGrades({ loggedUser }) {
    const [courseOptions, setCourseOptions] = useState([])
    const [targetStudentID, setTargetStudentID] = useState("")
    const [targetStudentCourse, setTargetStudentCourse] = useState("")
    const [studentOptions, setStudentOptions] = useState([])
    const [targetStudentGrades, setTargetStudentGrades] = useState([])

    const getCourses = async () => {
        try {
            const response = await fetch(`http://localhost:4000/teacher/${loggedUser.teacher_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCourseOptions(data)
            } else {
                console.log("Response is not okay")
            }
        } catch {
            console.log("GET didn't work")
        }
    }

    async function getStudentsToCourse() {
        try {
            const response = await fetch(`http://localhost:4000/students_course/${targetStudentCourse}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setStudentOptions(data)
            } else {
                console.log("Response is not okay")
            }
        } catch {
            console.log("GET didn't work")
        }
    }

    async function getStudentGradesByCourse() {
        try {
            const response = await fetch(`http://localhost:4000/grades/${targetStudentID}/${targetStudentCourse}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setTargetStudentGrades("")
                setTargetStudentGrades(data)
            } else {
                console.log("Response is not okay")
            }
        } catch {
            console.log("GET didn't work")
        }

    }

    async function deleteGrade(gradeID) {
        try {
            const response = await fetch(`http://localhost:4000/grade/${gradeID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                getStudentGradesByCourse()
                console.log(data)
            } else {
                console.log("Response is not okay")
            }
        } catch {
            console.log("DELETE didn't work")
        }

    }

    useEffect(() => {
        getCourses()
    }, [])

    useEffect(() => {
        if (targetStudentCourse === "") return
        getStudentsToCourse()
        if (targetStudentID === "") return
        getStudentGradesByCourse()
    }, [targetStudentCourse, targetStudentID])

    return (
        <>
            <form>
                <select className="m-4 p-2 border-solid border-2 border-violet-400 rounded-xl" value={targetStudentCourse} onChange={(e) => setTargetStudentCourse(e.target.value)}>
                    <option value=''></option>
                    {courseOptions.map((course) => (
                        <option className="w-40" key={course.course_id} value={course.course_id}>
                            {course.name}
                        </option>
                    ))}
                </select>
                <select className="m-4 p-2 border-solid border-2 border-violet-400 rounded-xl" value={targetStudentID} onChange={(e) => setTargetStudentID(e.target.value)}>
                    <option value=''></option>
                    {studentOptions.map(({ student_id }) => (
                        <option key={student_id} value={student_id}>
                            {student_id}
                        </option>
                    ))}
                </select>
            </form>
            <div>
                <h1 className="border-b text-2xl font-semibold">Students name grades in Course</h1>
                <ul className="flex flex-row">
                    {targetStudentGrades.map((grade) => (
                        <li className="mr-4" key={grade.grade_id}>
                            {grade.grade}
                            <span onClick={() => { deleteGrade(grade.grade_id) }}>
                                <CloseIcon />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default TeacherViewStudentGrades;