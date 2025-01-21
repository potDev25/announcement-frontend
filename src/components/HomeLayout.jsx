import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../redux/slice/authSlice";
import Navbar from "./Navbar";
import Container from "./Container";
import Loader from "./Loader/Loader";

export default function HomeLayout() {
  const { token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchUser = () => {
    dispatch(getUser());
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if(!token){
    return <Navigate to={'/'}/>
  }

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <div>
          <Navbar/>
          <Container>
            <Outlet />
          </Container>
        </div>
      )}
    </>
  );
}
