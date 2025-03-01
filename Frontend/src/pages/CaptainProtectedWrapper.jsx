import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);
    useEffect(() => {
        if(!token)
        {
            navigate("/captain-login");
        }
        axios.get(`${import.meta.env.VITE_API_URL}/captain/profile`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
           if(response.status === 200)
           {
             setCaptain(response.data.captain);
             setloading(false);
           }
        }).catch((err) => {
            seterror(err);
            localStorage.removeItem("token");
            navigate("/captain-login");
        })

        if(loading)
        {
            return <div>Loading...</div>;
        }
    }, [token]);
    return (
        <>{children}</>
      )
    }

export default CaptainProtectedWrapper