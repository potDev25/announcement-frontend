import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-full w-full bg-blue-600 flex items-center justify-between text-white px-5 py-2">
      <div>
        <h1><Link to={'/'}>Announcment System</Link></h1>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link to={'/register'}><i class="fa-solid fa-user-plus"></i>  Register</Link>
        <Link to={'/login'}><i class="fa-solid fa-right-to-bracket"></i> Login</Link>
      </div>
    </div>
  );
}
