import React from "react";
import { Navigate } from "react-router-dom";
import ResponsiveDrawer from "./components/Sidebar";
import { getSubdirectory } from "./utilities/GetSubdirectory";

export default function ProtectedRoutes() {

    const subdirectory = getSubdirectory();
    const token = localStorage.getItem(`${subdirectory}-token`);
    
    return token ? <ResponsiveDrawer /> : <Navigate to="/login" replace />

}