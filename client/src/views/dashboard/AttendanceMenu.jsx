import { useState, useEffect } from "react";

function AttendanceMenu({ loggedUser }) {
    const [studentAttendance, setStudentAttendance] = useState([])

    useEffect(() => {
        async function fetchStudentAttendance() {
            try {
                const response = await fetch(`http://localhost:4000/attendance/${loggedUser.student_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setStudentAttendance(data)
                } else {
                    console.log("Response is not okay")
                }
            } catch {
                console.log("GET didn't work")
            }
        }
        fetchStudentAttendance();
    }
    )

    return (
        <div className="w-full h-full flex flex-col justify-center items-center rounded-md">
            <div className="w-2/3 h-3/5 bg-slate-50 p-6 rounded-md">
                <div>
                    <h1><span className=" border-b text-4xl font-semibold"><span className=" text-violet-500"> {loggedUser.name} {loggedUser.surname}</span>'s attendance:</span></h1>
                </div>
                <ul className="flex flex-col">
                    {studentAttendance.map((attendance) => (
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
                                </span>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AttendanceMenu;