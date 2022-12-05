import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'


import { Box, Button } from '@mui/material';

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn +" GUEST ACCONG" + store.guestAccount);
    
    if (auth.loggedIn || store.guestAccount === true)
        return <HomeScreen />
    else
        return <SplashScreen />
}