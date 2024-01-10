import AttendanceMenu from "./AttendanceMenu";
import GradesMenu from "./GradesMenu";
import Welcome from "./Welcome";


function DashboardWindow({ currentTab, loggedUser }) {
    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-64">

            </div>
            {currentTab === "grades" ? (
                <GradesMenu loggedUser={loggedUser} />
            ) : currentTab === "attendance" ? (
                <AttendanceMenu loggedUser={loggedUser} />
            ) : (
                <Welcome loggedUser={loggedUser} />
            )}
        </div>
    );
}

export default DashboardWindow;