import React from "react";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default AuthRedirect;