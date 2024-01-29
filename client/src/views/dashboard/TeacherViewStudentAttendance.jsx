import { useEffect, useState } from "react"

function TeacherVireStudentAttendance({ loggedUser }) {
    const [targetStudentCourse, setTargetStudentCourse] = useState("")
    const [targetStudentID, setTargetStudentID] = useState("")
    const [courseOptions, setCourseOptions] = useState([])
    const [studentOptions, setStudentOptions] = useState([])
    const [targetStudentAttendance, setTargetStudentAttendance] = useState([])

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

    async function getStudentAttendanceByCourse() {
        try {
            const response = await fetch(`http://localhost:4000/attendance/${targetStudentID}/${targetStudentCourse}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setTargetStudentAttendance("")
                setTargetStudentAttendance(data)
                console.log(data)
            } else {
                console.log("Response is not okay")
            }
        } catch {
            console.log("GET didn't work")
        }

    }

    async function changeSelectedStudentAttendance(attendanceID, isExcused) {
        try {
            const response = await fetch(`http://localhost:4000/attendance/${attendanceID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    is_excused: isExcused
                })
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                console.log(data)
            } else {
                console.log("Response is not okay")
            }
        } catch {
            console.log("PUT didn't work")
        }
        fetchAgain()
    }


    useEffect(() => {
        getCourses()
    }, [])

    const fetchAgain = () => {
        if (targetStudentCourse === "") return
        getStudentsToCourse()
        if (targetStudentID === "") return
        getStudentAttendanceByCourse()
        console.log(targetStudentAttendance)
    }


    useEffect(() => {
        fetchAgain()
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
                <ul className="flex flex-col">
                    {targetStudentAttendance.map((attendance) => (
                        <li className="mr-4" key={attendance.attendance_id}>
                            {attendance.is_present === 0 ?
                                <span className="text-red-500">
                                    {new Date(attendance.date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: '2-digit'
                                    })}{' '}
                                    {new Date(attendance.date).toLocaleTimeString('en-GB', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span> :
                                <span className="text-green-500">
                                    {new Date(attendance.date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: '2-digit'
                                    })}{' '}
                                    {new Date(attendance.date).toLocaleTimeString('en-GB', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>}
                            <button className=" ml-10" onClick={(e) => { e.preventDefault(); changeSelectedStudentAttendance(attendance.attendance_id, 1); }}> Excuse absence</button>
                            <button className=" ml-4" onClick={(e) => { e.preventDefault(); changeSelectedStudentAttendance(attendance.attendance_id, 0); }}> Unexcuse absence</button>
                        </li>
                    ))}
                </ul>
            </form>
        </>
    );
}

export default TeacherVireStudentAttendance;