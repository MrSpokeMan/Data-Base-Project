import Login from "./Login.jsx"
import Info from "./Info.jsx"

const Landing = ({ setLoggedIn, setLoggedUser }) => {
    return (
        <div className="w-2/3 h-1/2 flex justify-center items-center font-nunito bg-white rounded-xl max-w-[1100px]">
            <Login setLoggedIn={setLoggedIn} setLoggedUser={setLoggedUser} />
            <Info />
        </div>
    )
}

export default Landing