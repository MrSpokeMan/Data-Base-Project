import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = ({ setLoggedIn, setLoggedUser }) => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function validateUser() {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json()
        if (data.token) {
          setLoggedUser(data.user)
          setLoggedIn(true)
          navigate("/")
        }
      } else {
        console.log("Response is not okay")
      }
    } catch {
      console.log("POST didn't work")
    }
  }

  return (
    <div className={"flex flex-col items-center justify-around w-5/12 h-full p-8"}>
      <div className={"min-w-full mt-6"}>
        <h1 className={'text-5xl font-semibold'}>
          Login to <span className={"text-violet-500"}>EduConnect</span>
        </h1>
      </div>
      <form className={"w-5/6 flex flex-col min-w-full mb-6"}>
        <label className={"text-lg font-medium "}>
          Login:
          <input
            type={"text"}
            name={"login"}
            value={username}
            onChange={e => setUsername(e.target.value)}
            className={"border-2 border-gray-200 rounded-md w-full mb-4 p-1"}
            placeholder={"Enter your login"}
            autoComplete="off"
          />
        </label>
        <label className={"text-lg font-medium "}>
          Password:
          <input
            type={"password"}
            name={"password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={"border-2 border-gray-200 rounded-md w-full p-1"}
            placeholder={"Enter your password"}
            autoComplete="off" />
        </label>
        <div className={""}>
          <button
            type="button"
            className={"font-medium text-base text-gray-400 mb-4"}>
            Forgot password?
          </button>
        </div>
        <div className={"flex flex-row justify-end"}>
          <button
            className={"bg-violet-500 rounded-md text-white p-2.5 hover:bg-violet-600"}
            type="submit"
            onClick={validateUser} >
            <ArrowForwardIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;