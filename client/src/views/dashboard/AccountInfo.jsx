function Welcome({ loggedUser, studentCourses }) {
    console.log(studentCourses)
    return (
        <div className="w-full h-full flex flex-col justify-center items-center rounded-md">
            <div className="w-2/3 h-3/5 bg-slate-50 p-6 rounded-md">
                <div>
                    <h1><span className=" border-b text-4xl font-semibold">Hello again <span className=" text-violet-500">{loggedUser.name} {loggedUser.surname}</span>!</span></h1>
                </div>
                <div className="flex flex-col justify-evenly w-full h-full">
                    <div className="text-xl text-justify">
                        Welcome back to EduConnect!
                        <br />
                        We're thrilled to have you here again, ready for another exciting academic journey.
                        As you log in, take a moment to review the information we have on record for you.
                        Your details are important to us, and we want to ensure everything is accurate.
                    </div>
                    <div className="text-md">
                        <div>
                            <span className="font-bold">Name:</span> <span className="text-violet-700 ">{loggedUser.name}</span>
                        </div>
                        <div>
                            <span className="font-bold">Surname: </span> <span className="text-violet-700 ">{loggedUser.surname}</span>
                        </div>
                        <div>
                            <span className="font-bold">Courses: </span>
                            {studentCourses &&
                                studentCourses.map((course, index) => (
                                    <span key={`demo_snap_${index}`} className="text-violet-500 capitalize">
                                        {(index ? ', ' : '') + course.course.name}
                                    </span>
                                ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;