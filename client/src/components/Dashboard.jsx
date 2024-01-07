import { useState } from "react"
import Sidebar from "./Sidebar"
import DashboardWindow from "./DashboardWindow"

const Dashboard = ({ setLoggedIn }) => {
    const [currentTab, setCurrentTab] = useState("")

    return (
        <div className="flex flex-row">
            <Sidebar setLoggedIn={setLoggedIn} setCurrentTab={setCurrentTab} />
            <DashboardWindow currentTab={currentTab} />
        </div>
    )
}

export default Dashboard