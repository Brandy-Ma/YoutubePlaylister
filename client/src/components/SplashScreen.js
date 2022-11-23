import { AlertTitle, Button, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
export default function SplashScreen() {
    return (
        
        <div id="splash-screen">
            <div id = "playlisterTitle">Playlister</div>
            <div id = "splashScreenDescription">Welcome to the modern day playlister application</div>
            <Link to='/login/'>
                <Button 
                    variant="contained" 
                    size = "large"
                    sx = {{margin:2, top: 50}}>Login</Button>
            </Link>
            <Link to='/register/'>
                <Button 
                    variant="contained"
                    size = "large"
                    sx = {{margin:2, top: 50}}>Register</Button>
            </Link>
            <Button 
                variant="contained"
                size = "large"
                sx = {{margin: 2, top: 50}}>Guest</Button>
            <div id= "madeBy">Made by: Brandy Ma</div>
        </div>

    )
}