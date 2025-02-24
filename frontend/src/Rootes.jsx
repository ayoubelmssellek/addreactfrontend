import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./Admin/AdminRoutes";
import ClientRoutes from "./Client/ClientRoutes"; 

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />  
      <Route path="/*" element={<ClientRoutes />} />  
    </Routes>
  );
}

export default AppRoutes;
