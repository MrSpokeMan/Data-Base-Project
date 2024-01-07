import GradingIcon from '@mui/icons-material/Grading';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar({ setLoggedIn, setCurrentTab }) {

    function logOut() {
        setLoggedIn(false)
        navigate("/login")
    }

    return (
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-slate-100">
            <div className="fixed flex flex-col justify-between items-center top-0 left-0 w-64 bg-slate-50 h-full border-r">
                <div className="flex items-center justify-center h-20 border-b">
                    <h1 className={"text-4xl font-semibold text-violet-500"}>
                        EduConnect
                    </h1>
                </div>
                <ul className="flex flex-col py-4 space-y-1 w-full h-full">
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                        </div>
                    </li>
                    <li className="flex flex-row items-center h-11 hover:bg-violet-300 border-l-4 border-transparent hover:border-violet-500" onClick={() => setCurrentTab("attendance")}>
                        <span className="px-5"> <DateRangeIcon /> Attendance</span>
                    </li>
                    <li className="flex flex-row items-center h-11 hover:bg-violet-300 border-l-4 border-transparent hover:border-violet-500" onClick={() => setCurrentTab("grades")}>
                        <span className="px-5"> <GradingIcon /> Grades</span>
                    </li>
                </ul>
                <button className="mb-2" onClick={logOut}>
                    <LogoutIcon /> LogOut
                </button>
            </div>
        </div>
    );
}

export default Sidebar;