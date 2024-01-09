import { useState } from "react"
import DashboardWindow from "./DashboardWindow"
import Sidebar from "./Sidebar"

const Dashboard = ({ setLoggedIn }) => {
    const [currentTab, setCurrentTab] = useState("")

    return (
        <div className="flex flex-row h-screen w-screen">
            <Sidebar setLoggedIn={setLoggedIn} setCurrentTab={setCurrentTab} />
            <DashboardWindow currentTab={currentTab} />
        </div>
    )
}

export default Dashboard