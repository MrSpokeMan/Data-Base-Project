import { useEffect, useState } from "react";

function TeacherAddGrade({ loggedUser }) {
    const [targetStudentCourse, setTargetStudentCourse] = useState("")
    const [targetStudentID, setTargetStudentID] = useState("")
    const [grade, setGrade] = useState("")
    const [courseOptions, setCourseOptions] = useState([])
    const gradesOptions = [2, 3.5, 4, 4.5, 5, 5.5]

    const getCourses = async () => {
        try {
            console.log("tutaj kursy")
            console.log(loggedUser)
            // wywala mi sqla tutaj xdd
            const response = await fetch(`http://localhost:4000/teacher/${loggedUser.teacher_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
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

    return (
        <div className="flex flex-col">
            <form className="flex flex-col">
                <input className="m-4 p-2 border-solid border-2 border-violet-400 rounded-xl" type="text" placeholder="Course" onChange={(e) => setTargetStudentCourse(e.target.value)} />
                <input className="m-4 p-2 border-solid border-2 border-violet-400 rounded-xl" type="text" placeholder="Student ID" onChange={(e) => setTargetStudentID(e.target.value)} />
                <select className="m-4 p-2 border-solid border-2 border-violet-400 rounded-xl" id="grades" value={grade} onChange={(e) => setGrade(e.target.value)}>
                    {gradesOptions.map((grade) => (
                        <option key={grade} value={grade}>
                            {grade}
                        </option>
                    ))}
                </select>
                <button type="submit" onClick={addGrade}>Add Grade</button>
            </form>
        </div>
    );
}

export default TeacherAddGrade;