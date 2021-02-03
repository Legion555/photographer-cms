import { useSelector } from "react-redux"
//components
import Dashboard from '../components/admin_Dashboard';
import Login from '../components/admin_Login';


export default function Admin() {
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    return (
        <div>
            {isLoggedIn ?
                <Dashboard />
                :
                <Login />
            }
        </div>
    )
}