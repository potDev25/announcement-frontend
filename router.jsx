import { createBrowserRouter } from "react-router-dom";
import GustLayout from "./src/components/GustLayout";
import MainPage from "./src/Pages/Guests/MainPage";
import Login from "./src/Pages/Guests/Login";
import Register from "./src/Pages/Guests/Register";

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
    }
])

export default router;