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
    
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);
    
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res;
            },
            error => {
                toast.error(`Error: ${error.response.status} --> ${error.response.data.message}`,{
                    position: "top-center",
                    autoClose: 1000
                })
                if (error.response.status === 401 || error.response.status === 403) {
                    logOut();
                    navigate('/login');
                }
            }
        )
    }, [])
    
    return axiosSecure;
}

export default useAxiosSecure;