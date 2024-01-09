import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = ({ isLoggedIn }) => {
    let auth = { 'token': isLoggedIn }
    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes