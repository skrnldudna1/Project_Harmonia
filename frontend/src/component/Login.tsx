import { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Carlist from "./Carlist";

type User = {
    username : string;
    password : string;
}
function Login() {
    
    const handleLogin = () => {
        axios.post(import.meta.env.VITE_API_URL + "/login", user, {
            headers: { 'Content-Type' : 'application/json' } 

        })
        .then(res => {
            const jwtToken = res.headers.authorization;
                if (jwtToken !== null)  {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
            }
        })
        .catch(err => console.error(err));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        {
            setUser({...user,
                [event.target.name] : event.target.value
            });
        }


    const [user, setUser] = useState<User> ({
        username: '',
        password: ''
    });
    const [isAuthenticated, setAuth] = useState(false);

    if (isAuthenticated) {
        return <Carlist />;
    }
    else {
    return (

        <Stack spacing={2} alignItems="center" mt={2}>

            <TextField
                name="username" 
                label = "Username"
                onChange={handleChange} />

            <TextField
                type="password" 
                name = "password"
                label = "Password"
                onChange={handleChange} />

            <Button
                variant= "outlined"
                color = "primary"
                onClick = {handleLogin}>
                Login
            </Button>
        </Stack>

    );
}

}
export default Login;