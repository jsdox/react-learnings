import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
        .then(({data}) => {
            setLoading(false);
            setUsers(data)
        })
        .catch(() => {
            setLoading(false)
        })
    }
    console.log(users);

    return (
        <div>Users</div>
    );
}