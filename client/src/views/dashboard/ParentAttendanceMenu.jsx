import { useState, useEffect } from "react";

function ParentAttendanceMenu({ loggedUser }) {
    const [studentAttendance, setStudentAttendance] = useState([])

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
            if (response.ok) {
                const data = await response.json();
            } else {
                console.log("Response is not okay")
            }
        } catch {
            console.log("PUT didn't work")
        }
        fetchData()
    }



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
                const responseAttendance = await fetch(`http://localhost:4000/attendance/${dataID.student_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (responseAttendance.ok) {
                    const dataAttendance = await responseAttendance.json();
                    setStudentAttendance(dataAttendance);
                } else {
                    console.log("Response for attendance is not okay");
                }
            } else {
                console.log("Response for student ID is not okay");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <div className="w-2/3 h-3/5 bg-slate-50 p-6 rounded-md">
                <div>
                    <h1><span className=" border-b text-4xl font-semibold"><span className=" text-violet-500"> {loggedUser.name} {loggedUser.surname}</span>'s kid's attendance:</span></h1>
                </div>
                <div className="flex flex-col w-full h-full">
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
                                </span>}
                            <button className=" ml-10" onClick={(e) => { e.preventDefault(); changeSelectedStudentAttendance(attendance.attendance_id, 1); }}> Excuse absence</button>
                            <button className=" ml-4" onClick={(e) => { e.preventDefault(); changeSelectedStudentAttendance(attendance.attendance_id, 0); }}> Unexcuse absence</button>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ParentAttendanceMenu;