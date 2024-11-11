import { createBrowserRouter } from "react-router-dom";
import Login from './views/Login.jsx';
import Register, {abc} from './views/Register.jsx';
import DefaultLayout from "./Components/DefaultLayout.jsx";
import GuestLayout from "./Components/GuestLayout.jsx";
import Users from "./views/Users.jsx";
import UserForm from "./views/UserForm.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/register',
                element: <Register />,
                loader:abc
            },
            {
                path: 'login',
                element: <Login />
            }
        ]
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/users',
                element: <Users />
            },
            {
                path:'/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path:'users/:id',
                element: <UserForm key="userUpdate"/>
            }
        ]
    }
    
    
    
]);

export default router;