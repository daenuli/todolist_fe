import React, { useState } from 'react';
import ellipseOne from '../ellipse_1.png';
import ellipseTwo from '../ellipse_2.png';
import users from '../users.png';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import AuthRedirect from './AuthRedirect';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false

        if (!email) {
            setErrorEmail('Please enter your email')
            hasError = true
        } else {
            setErrorEmail('')
        }

        if (!password) {
            setErrorPassword('Please enter your password')
            hasError = true
        } else {
            setErrorPassword('')
        }

        if (hasError) {
            return
        }

        try {
            const userAgent = window.navigator.userAgent
            const response = await api.post('/auth/signin', {
                email, password, userAgent
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            navigate('/home')
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <AuthRedirect>
            <div className="max-w-sm mx-auto w-full font-inter">
                <div>
                    <img src={ellipseOne} alt="hero" className="w-28"/>
                    <img src={ellipseTwo} alt="hero" className="-mt-16 w-16"/>
                </div>
                <div className="mt-20 mb-10">
                    <h2 className="text-center font-bold tracking-tight mb-3">Welcome Back!</h2>
                </div>
                <div className="mb-10">
                    <img src={users} alt="hero" className="mx-auto w-52"/>
                </div>
                {error && <p className='mx-5 mb-5 text-center text-xs text-red-500'>{error}</p>}
                <form className="space-y-9 mb-9 mx-5">
                    <div>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white border border-slate-300 rounded-full w-full p-3 focus:ring-2 focus:ring-offset-2 pl-7 placeholder:text-black focus:ring-yellow focus:border-yellow" placeholder="Enter your email"/>
                        {errorEmail && <p className='pl-7 pt-1 text-xs text-red-500'>{errorEmail}</p>}
                    </div>
                    <div>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white border border-slate-300 rounded-full w-full p-3 focus:ring-2 focus:ring-offset-2 pl-7 placeholder:text-black focus:ring-yellow focus:border-yellow" placeholder="Enter your password"/>
                        {errorPassword && <p className='pl-7 pt-1 text-xs text-red-500'>{errorPassword}</p>}
                    </div>
                </form>
                <div className="flex flex-col gap-5 text-center">
                    <button className="bg-yellow py-5 mx-5 font-extrabold tracking-tight rounded-md focus:outline-none focus:ring focus:ring-slate-600 focus:ring-offset-2 text-2xl shadow-2xl" onClick={handleSubmit}>Sign in</button>
                    <p className="text-sm px-8 mb-20">Don’t have an account? 
                        <Link to="/signup" className="text-yellow font-bold">Sign up</Link>
                    </p>
                </div>
            </div>
        </AuthRedirect>
    );
}

export default Signin