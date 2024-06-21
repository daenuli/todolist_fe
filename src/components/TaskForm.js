import React, { useState } from "react";
import api from "../services/api";
import { Modal, ModalFooter } from "flowbite-react";

const TaskForm = ({ fetchTasks }) => {
    const [title, setTitle] = useState("");
    const [openModal, setOpenModal] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/task", { title });
            setTitle("");
            setOpenModal(false);
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button type="button" className="border-2 border-yellow rounded-md" onClick={() => setOpenModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-yellow">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    Add Task
                </Modal.Header>
                <Modal.Body>
                    <div className="p-4 md:p-5 space-y-4">
                        <div>
                            <input type="text" id="item" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-slate-300 rounded-full w-full p-3 focus:ring-2 focus:ring-offset-2 focus:ring-yellow focus:border-yellow"/>
                        </div>
                    </div>
                </Modal.Body>
                <ModalFooter>
                    <button className='bg-yellow hover:bg-yellow-700 font-bold py-2 px-4 rounded text-black' onClick={handleSubmit}>Submit</button>
                    <button className='bg-gray-200 hover:bg-gray-300 font-bold py-2 px-4 rounded text-black' onClick={() => setOpenModal(false)}>Cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default TaskForm;