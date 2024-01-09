import AttendanceMenu from "./AttendanceMenu";
import GradesMenu from "./GradesMenu";
import Welcome from "./Welcome";


function DashboardWindow({ currentTab }) {

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-64">

            </div>
            {currentTab === "grades" ? (
                <GradesMenu />
            ) : currentTab === "attendance" ? (
                <AttendanceMenu />
            ) : (
                <Welcome />
            )}
        </div>
    );
}

export default DashboardWindow;