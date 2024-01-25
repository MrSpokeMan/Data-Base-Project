import { useEffect, useState } from "react"
import DashboardWindow from "./DashboardWindow"
import Sidebar from "./Sidebar"

const Dashboard = ({ setLoggedIn, loggedUser }) => {
    const [currentTab, setCurrentTab] = useState("")
    const [userType, setUserType] = useState("")

    useEffect(() => {
        setUserType(loggedUser.password[0])
    }, [])

    return (
        <div className="flex flex-row h-screen w-screen">
            <Sidebar setLoggedIn={setLoggedIn} setCurrentTab={setCurrentTab} />
            <DashboardWindow currentTab={currentTab} loggedUser={loggedUser} userType={userType} />
        </div>
    )
}

export default Dashboard