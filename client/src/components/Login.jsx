import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn }) => {

  const navigate = useNavigate()

  function validateUser() {
    event.preventDefault()
    setLoggedIn(true)
    navigate("/")
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
            className={"border-2 border-gray-200 rounded-md w-full mb-4 p-1"}
            placeholder={"Enter your login"}
            autoComplete="off" />
        </label>
        <label className={"text-lg font-medium "}>
          Password:
          <input
            type={"password"}
            name={"password"}
            className={"border-2 border-gray-200 rounded-md w-full p-1"}
            placeholder={"Enter your password"}
            autoComplete="off" />
        </label>
        <div className={""}>
          <button
            className={"font-medium text-base text-gray-400 mb-4"}>
            Forgot password?
          </button>
        </div>
        <div className={"flex flex-row justify-end"}>
          <button
            className={"bg-violet-500 rounded-md text-white p-2.5 hover:bg-violet-600"}
            type='submit'
            onClick={validateUser}
          >
            <ArrowForwardIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;