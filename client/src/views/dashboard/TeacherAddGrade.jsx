import { useEffect, useState } from "react";

function TeacherAddGrade({ loggedUser }) {
    const [targetStudentCourse, setTargetStudentCourse] = useState("")
    const [targetStudentID, setTargetStudentID] = useState("")
    const [grade, setGrade] = useState("")
    const [courseOptions, setCourseOptions] = useState([])
    const [studentOptions, setStudentOptions] = useState([])
    const gradesOptions = [1, 2, 3, 4, 5, 6]

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

    async function addGrade() {
        event.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/grade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ grade: grade, student_id: targetStudentID, course_id: targetStudentCourse, }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
            } else {
                console.log("Response is not okay")
            }
        } catch {
            console.log("POST didn't work")
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    useEffect(() => {
        if (targetStudentCourse === "") return
        getStudentsToCourse()
        console.log(studentOptions)
    }, [targetStudentCourse])

    return (
        <div className="flex flex-col h-full w-full items-center">
            <form className="flex flex-col p-8 h-full w-full justify-center">
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
                <select className="m-4 p-2 border-solid border-2 border-violet-400 rounded-xl mb-12" id="grades" value={grade} onChange={(e) => setGrade(e.target.value)}>
                    {gradesOptions.map((grade) => (
                        <option key={grade} value={grade}>
                            {grade}
                        </option>
                    ))}
                </select>
                <button type="submit" onClick={addGrade}>Add Grade</button>
            </form>
        </div >
    );
}

export default TeacherAddGrade;