import React from 'react';
import ellipseOne from '../ellipse_1.png';
import ellipseTwo from '../ellipse_2.png';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import AuthRedirect from './AuthRedirect';

const Signup = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [errorName, setErrorName] = React.useState('');
    const [errorEmail, setErrorEmail] = React.useState('');
    const [errorPassword, setErrorPassword] = React.useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = React.useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let hasError = false

        if (!name) {
            setErrorName('Please enter your name')
            hasError = true
        } else {
            setErrorName('')
        }

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

        if (!confirmPassword) {
            setErrorConfirmPassword('Please confirm your password')
            hasError = true
        } else if (password !== confirmPassword) {
            setErrorConfirmPassword('Passwords do not match')
            hasError = true
        } else {
            setErrorConfirmPassword('')
        }

        if (hasError) {
            return
        }

        try {
            const userAgent = window.navigator.userAgent
            const response = await api.post('/auth/signup', {
                name, email, password, userAgent
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            navigate('/home')
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <AuthRedirect>
            <div className="max-w-sm mx-auto w-full font-inter">
                <div>
                    <img src={ellipseOne} alt="hero" className="w-28"/>
                    <img src={ellipseTwo} alt="hero" className="-mt-16 w-16"/>
                </div>
                <div className="mt-20 mb-10">
                    <h2 className="text-center">
                        <span className="block font-bold tracking-tight mb-3">Welcome Onboard!</span>
                        <span className="block">We help you meet up you tasks on time.</span>
                    </h2>
                </div>

                {error && <p className='mx-5 mb-5 text-center text-xs text-red-500'>{error}</p>}
                
                <form className="space-y-5 mb-9 mx-5">
                    <div>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-white border border-slate-300 rounded-full w-full p-3 focus:ring-2 focus:ring-offset-2 pl-7 placeholder:text-black focus:ring-yellow focus:border-yellow" placeholder="Enter your full name" required/>
                        {errorName && <p className='pl-7 pt-1 text-xs text-red-500'>{errorName}</p>}
                    </div>
                    <div>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white border border-slate-300 rounded-full w-full p-3 focus:ring-2 focus:ring-offset-2 pl-7 placeholder:text-black focus:ring-yellow focus:border-yellow" placeholder="Enter your email" required/>
                        {errorEmail && <p className='pl-7 pt-1 text-xs text-red-500'>{errorEmail}</p>}
                    </div>
                    <div>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white border border-slate-300 rounded-full w-full p-3 focus:ring-2 focus:ring-offset-2 pl-7 placeholder:text-black focus:ring-yellow focus:border-yellow" placeholder="Enter your password"/>
                        {errorPassword && <p className='pl-7 pt-1 text-xs text-red-500'>{errorPassword}</p>}
                    </div>
                    <div>
                        <input type="password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white border border-slate-300 rounded-full w-full p-3 focus:ring-2 focus:ring-offset-2 pl-7 placeholder:text-black focus:ring-yellow focus:border-yellow" placeholder="Confirm password"/>
                        {errorConfirmPassword && <p className='pl-7 pt-1 text-xs text-red-500'>{errorConfirmPassword}</p>}
                    </div>
                </form>
                <div className="flex flex-col gap-5 text-center">
                <button className="bg-yellow py-5 mx-5 font-extrabold tracking-tight rounded-md focus:outline-none focus:ring focus:ring-slate-600 focus:ring-offset-2 text-2xl shadow-2xl" onClick={handleSubmit}>Register</button>
                <p className="text-sm px-8 mb-20">Already have an account? 
                    <Link to="/login" className="text-yellow font-bold">Sign in</Link>
                </p>
                </div>
            </div>
        </AuthRedirect>
    );
}

export default Signup