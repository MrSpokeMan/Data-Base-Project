import AttendanceMenu from "./AttendanceMenu"
import GradesMenu from "./GradesMenu"

function DashboardWindow({ currentTab }) {
    return (
        <>
            {currentTab === "grades" ? (
                <GradesMenu />
            ) : currentTab === "attendance" ? (
                <AttendanceMenu />
            ) : (
                <h1>Hello</h1>
            )}
        </>
    );
}

export default DashboardWindow;