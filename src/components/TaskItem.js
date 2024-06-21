import React from "react";
import api from "../services/api";

const TaskItem = ({ task, fetchTasks }) => {
    const handleDelete = async () => {
        try {
            await api.delete(`/task/${task._id}`);
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    }

    const handleToggleComplete = async () => {
        try {
            await api.put(`/task/${task._id}`, {
                status: !task.status
            })
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <li>
                <label htmlFor={task._id} className="flex items-center">
                    <input type="checkbox" className="mr-2 text-yellow focus:ring-yellow rounded" id={task._id} checked={task.status} onChange={handleToggleComplete}/>
                    <span className={`w-full cursor-pointer ${task.status ? 'line-through text-gray-400' : ''}`}>{task.title}</span>
                    <button onClick={handleDelete} className="text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </label>
            </li>
        </div>
    )
}

export default TaskItem