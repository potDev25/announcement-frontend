import { createBrowserRouter } from "react-router-dom";
import GustLayout from "./src/components/GustLayout";
import MainPage from "./src/Pages/Guests/MainPage";
import Login from "./src/Pages/Guests/Login";
import Register from "./src/Pages/Guests/Register";
import HomeLayout from "./src/components/HomeLayout";
import Home from "./src/Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GustLayout/>,
        children: [
            {
                path: '/',
                element: <MainPage/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
        ]
    },
    {
        path: '/',
        element: <HomeLayout/>,
        children: [
            {
                path: '/home',
                element: <Home/>
            }
        ]
    }
])

export default router;