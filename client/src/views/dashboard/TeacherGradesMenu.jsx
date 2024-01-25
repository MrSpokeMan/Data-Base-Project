import TeacherAddGrade from "./TeacherAddGrade";
import TeacherViewStudentGrades from "./TeacherViewStudentGrades";
import { useState } from "react";

function TeacherGradesMenu(loggedUser) {
    const [currentTab, setCurrentTab] = useState("AddGrade")

    return (
        <div className="w-full h-full flex flex-col justify-center items-center " >
            <div className="w-2/3 h-3/5 bg-slate-50 p-6 rounded-md">
                <div>
                    <h1><span className=" border-b text-4xl font-semibold"><span className=" text-violet-500"> {loggedUser.loggedUser.name} {loggedUser.loggedUser.surname}</span>'s Grades Menu:</span></h1>
                </div>
                <div className="flex flex-col w-full h-full p-4">
                    <div className="flex flex-row w-full items-center justify-around">
                        <button className=" hover:bg-violet-300 border-transparent hover:border-violet-500 w-1/3 h-10 border-solid border-violet-500 border-2 rounded-xl" onClick={() => setCurrentTab("AddGrade")}>Add Grade</button>
                        <button className=" hover:bg-violet-300 border-transparent hover:border-violet-500 w-1/3 h-10 border-solid border-violet-500 border-2 rounded-xl" onClick={() => setCurrentTab("EditGrade")}>View Student's Grades</button>
                    </div>
                    <div>
                        {currentTab === "AddGrade" ? (
                            <div>
                                <TeacherAddGrade loggedUser={loggedUser.loggedUser} />
                            </div>
                        ) : (
                            <div>
                                <TeacherViewStudentGrades loggedUser={loggedUser.loggedUser} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherGradesMenu;