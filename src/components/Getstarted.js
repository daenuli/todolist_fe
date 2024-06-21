import React from 'react';
import ellipseOne from '../ellipse_1.png';
import ellipseTwo from '../ellipse_2.png';
import users from '../users.png';
import { Link } from 'react-router-dom';

const Getstarted = () => {

    return (
        <div className="max-w-sm mx-auto w-full font-inter">
            <div>
                <img src={ellipseOne} alt="hero" className="w-28"/>
                <img src={ellipseTwo} alt="hero" className="-mt-16 w-16"/>
            </div>
            <div className="mt-20 mb-10">
                <img src={users} alt="hero" className="mx-auto w-36"/>
            </div>
            <div className="flex flex-col gap-5 text-center">
                <h2 className="font-bold">Let’s get things done on time</h2>
                <p className="text-sm px-8 mb-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus praesent purus tincidunt ut cursus vitae. Nisl, vitae nulla lectus tortor, est a aliquam. Pretium netus </p>
                <Link to="/signup" className="bg-yellow py-5 mx-5 font-extrabold tracking-tight rounded-md focus:outline-none focus:ring focus:ring-slate-600 focus:ring-offset-2 text-2xl shadow-2xl">Get Started</Link>
            </div>
        </div>
    );
}

export default Getstarted