import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const Home = () => {
    const [hours, setHours] = useState(new Date().getHours())
    const [minutes, setMinutes] = useState(new Date().getMinutes())
    const [seconds, setSeconds] = useState(new Date().getSeconds())
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState('')

    const fetchTasks = async () => {
        try {
            const response = await api.get('/task')
            setTasks(response.data)
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Failed to fetch tasks')
        }
    }

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const [name, setName] = useState([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setName(user.name)
        }

        const interval = setInterval(() => {
            const date = new Date()
            setSeconds(date.getSeconds())
            setMinutes(date.getMinutes())
            setHours(date.getHours())
        }, 1000)
        fetchTasks()
        return () => clearInterval(interval)
    }, [])
    
    return (
    <div className="max-w-sm mx-auto w-full font-inter">
        <div className="flex flex-col items-center justify-center bg-yellow relative">
            <img src="https://i.pravatar.cc/300" alt="hero" className="w-28 rounded-full mt-16"/>
            <h2 className="font-bold py-6">Welcome {name}!</h2>
            <button className="top-5 right-5 absolute" onClick={() => logout()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
            </button>
        </div>
        <div className="pt-14 pb-3">
            <h2 className="text-center text-6xl">
                <span className="font-extrabold tabular-nums tracking-tight bg-yellow px-2 shadow-lg rounded-xl">{hours}</span>:
                <span className="font-extrabold tabular-nums tracking-tight bg-yellow px-2 shadow-lg rounded-xl">{("0" + minutes).slice(-2)}</span>:
                <span className="font-extrabold tabular-nums tracking-tight bg-yellow px-2 shadow-lg rounded-xl">{("0" + seconds).slice(-2)}</span>
            </h2>
        </div>
        <h2 className="mx-5 font-extrabold pt-7 pb-2">Tasks List</h2>
        {error && <p className="mx-5 text-red-500 text-sm">{error}</p>}
        <div className="mx-5 bg-white shadow-2xl p-5 rounded-2xl mb-10 border">
            <div className="flex items-center justify-between pb-2">
                <h2 className="font-bold">Daily Tasks</h2>
                <TaskForm fetchTasks={fetchTasks} />
            </div>
            <ul className="space-y-3">
                {
                    tasks.map((task) => (
                        <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
                    ))
                }
            </ul>
        </div>
    </div>
    )
}

export default Home