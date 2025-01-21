import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./Button";
import { logoutUser } from "../redux/slice/authSlice";

export default function Navbar() {
  const { user, token, btnLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="h-full w-full bg-blue-600 flex items-center justify-between text-white px-5 py-2">
      <div>
        <h1>
          <Link to={"/"}>Announcment System</Link>
        </h1>
      </div>
      <div className="flex items-center justify-center gap-3">
        {token ? (
          <>
            <p>Welcome: {user?.name}</p>
            <Button
              type={"button"}
              variant="primary"
              isLoading={btnLoading}
              onClick={handleLogout}
              text={
                <>
                  <i class="fa-solid fa-power-off"></i> Logout
                </>
              }
            />
          </>
        ) : (
          <>
            <Link to={"/register"}>
              <i class="fa-solid fa-user-plus"></i> Register
            </Link>
            <Link to={"/login"}>
              <i class="fa-solid fa-right-to-bracket"></i> Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
