import { useState } from "react";

function TeacherAddGrade() {
    const [studentCourses, setStudentCourses] = useState("")
    const [studentID, setStudentID] = useState("")
    const [grade, setGrade] = useState("")

    async function addGrade() {
        event.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/grade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ grade: grade, student_id: studentID, course_id: studentCourses, }),
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

    return (
        <div className="flex flex-col">
            <form className="flex flex-col">
                <input className="m-4 p-2 border-solid border-2 border-violet-400 rounded-xl" type="text" placeholder="Course" onChange={(e) => setStudentCourses(e.target.value)} />
                <input className="m-4 p-2 border-solid border-2 border-violet-400 rounded-xl" type="text" placeholder="Student ID" onChange={(e) => setStudentID(e.target.value)} />
                <input className="m-4 p-2 border-solid border-2 border-violet-400 rounded-xl" type="text" placeholder="Grade" onChange={(e) => setGrade(e.target.value)} />
                <button type="submit" onClick={addGrade}>Add Grade</button>
            </form>
        </div>
    );
}

export default TeacherAddGrade;