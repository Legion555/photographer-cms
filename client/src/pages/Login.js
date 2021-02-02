import { useState } from 'react';
import axios from 'axios';
//redux
import { useDispatch } from 'react-redux';
import { updateUserData, updateView } from '../actions'
//react-router
import { useHistory } from "react-router-dom";



const Login = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [authView, setAuthView] = useState('login');
    
    const [errorHandle, setErrorHandle] = useState([]);
    //Login
    const [loginEmail, setLoginEmail] = useState('legion@gmail.com');
    const [loginPassword, setLoginPassword] = useState('legion123');
    //Register
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    //Login existing user - pass
    const login = (e, email, password) => {
        e.preventDefault();
        const details = {
            email: email,
            password: password
        }
        axios.post('/api/users/login', details)
        .then(res => {
            if (res.data === 'success') {
                axios.get('/api/users', {
                    params: {
                        email: loginEmail
                    }
                })
                .then(res => {
                    //set user data
                    dispatch(updateUserData(res.data[0]))
                    console.log(res.data[0])
                    //redirect to dashboard
                    dispatch(updateView('dashboard'))
                    history.push('/dashboard')
                })
                .catch(err => {
                    console.log("Error: " + err);
                })
            } else {
                let match = res.data.match(/"([^"]*)"/);
                let error = [];
                switch (match[1]) {
                    case 'email':
                        error = ['login-email', res.data];
                        setErrorHandle(error);
                        setLoginEmail('');
                        break;
                    case 'password':
                        error = ['login-password', res.data];
                        setErrorHandle(error);
                        setLoginPassword('');
                        break;
                    default:
                        console.log('something went wrong...');
                }
            }
            console.log(res.data)
        })
    }

    //Register new user
    const register = (e) => {
        e.preventDefault();
        const payload = {
            name: regName,
            email: regEmail,
            password: regPassword
        }
        axios.post('/api/users/register', payload)
        .then(res => {
            if (res.data === 'success') {
                setAuthView('login');
                setErrorHandle('registered');
            } else {
                let match = res.data.match(/"([^"]*)"/);
                let error = [];
                switch (match[1]) {
                    case 'name':
                        error = ['register-name', res.data];
                        setErrorHandle(error);
                        setRegName('');
                        break;
                    case 'email':
                        error = ['register-email', res.data];
                        setErrorHandle(error);
                        setRegEmail('');
                        break;
                    case 'password':
                        error = ['register-password', res.data];
                        setErrorHandle(error);
                        setRegPassword('');
                        break;
                    default:
                        console.log('something went wrong...');
                }
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div  className="flex w-screen h-screen justify-center items-center">
            <div className="w-max h-max p-10 bg-gray-50 rounded shadow">
                <h1 className="mb-10 text-center text-4xl">
                    <span className={authView === 'login' ? 'text-black-400' : 'text-gray-400'}
                        onClick={() => setAuthView('login')} >Login </span>
                    | 
                    <span className={authView === 'register' ? 'text-black-400' : 'text-gray-400'}
                        onClick={() => setAuthView('register')} > Register</span>
                </h1>
                {authView === 'login' &&
                    <form className="w-full">
                        <input className="w-full mb-5 p-2 rounded"
                            type="text" required placeholder={errorHandle[0] === 'login-email' ? errorHandle[1] : 'Email'}
                            value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}></input>
                        <input className="w-full mb-5 p-2 rounded"
                            type="password" required placeholder={errorHandle[0] === 'login-password' ? errorHandle[1] : 'Password'}
                            value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input>

                        <button className="p-3 bg-blue-300 hover:bg-blue-400 rounded"
                            onClick={(e) => login(e, loginEmail, loginPassword)}>Login</button>
                        {errorHandle === 'registered' &&
                        <p>Successfully registered!<br/>Please login.</p>
                        }
                    </form>
                }
                {authView === 'register' &&
                <div className="register__container">
                    {errorHandle !== 'registered' &&
                    <form className="w-full">
                        <input className="w-full mb-5 p-2 rounded"
                            type="text" required placeholder={errorHandle[0] === 'register-name' ? errorHandle[1] : 'Name'}
                            value={regName} onChange={(e) => setRegName(e.target.value)}></input>
                        <input className="w-full mb-5 p-2 rounded"
                            type="text" required placeholder={errorHandle[0] === 'register-email' ? errorHandle[1] : 'Email'}
                            value={regEmail} onChange={(e) => setRegEmail(e.target.value)}></input>
                        <input  className="w-full mb-5 p-2 rounded"
                            type="password" required placeholder={errorHandle[0] === 'register-password' ? errorHandle[1] : 'Password'}
                            value={regPassword} onChange={(e) => setRegPassword(e.target.value)}></input>
                        
                        <button className="p-3 bg-blue-300 hover:bg-blue-400 rounded"
                            onClick={(e) => register(e, regName, regEmail, regPassword)}>Register</button>
                    </form>
                    }
                </div>
                }
            </div>
        </div>
    )
};

export default Login