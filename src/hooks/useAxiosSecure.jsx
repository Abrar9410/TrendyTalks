import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useContext(AuthContext);
    
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res;
            },
            error => {
                toast.error(`Error: ${error.response.status}`)
                if (error.response.status === 401 || error.response.status === 403) {
                    // logout
                    logOut();
                    // navigate to login
                    navigate('/login');
                }
            }
        )
    }, [logOut, navigate])
    
    return axiosSecure;
}

export default useAxiosSecure;