import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Box, IconButton, stepperClasses, Typography } from '@mui/material'
import Fab from '@mui/material/Fab'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar(props) {

    const { store } = useContext(GlobalStoreContext);
    const [names, setNames] = useState(store.searchWord) 
    const {search} = props


    const [statusBar, setStatusbar] = useState(
        <Box id="playlister-statusbar">
        <IconButton 
            size = "large"
            color="primary" 
            aria-label="add"
            id="add-list-button"
            onClick={handleCreateNewList}
            disabled = {store.currentModal !=="NONE"}
        >
            <AddOutlinedIcon fontSize='large'/>
            
        </IconButton>
        <Typography varient = "h2">Your Lists</Typography>
        </Box>
    );
    
    

    let useEffectobj = {
        view: store.currentView,
        word : store.searchWord
    }

    
    
    useEffect( ()=> {
        if( store.currentView === "allList")
        {
            // name = document.getElementById("search-textField").value
            setStatusbar(<Box id="playlister-statusbar">
                {store.searchWord} Playlists
            </Box>)
        }
        else if(store.currentView ==="home")
        {
            setStatusbar(<Box id="playlister-statusbar">
            <IconButton 
                size = "large"
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                disabled = {store.currentModal !=="NONE"}
            >
                <AddOutlinedIcon fontSize='large'/>
                
            </IconButton>
            <Typography varient = "h5" style={{fontSize: "24pt"}}>Your Lists</Typography>
            </Box>)
        }
        else
        {
            setStatusbar(<Box id="playlister-statusbar">
            {store.searchWord} Lists
            </Box>)
        }
    }, [store.searchWord, store.currentView]);


    function handleCreateNewList() {

        store.createNewList()
    }
    



    
   



    return statusBar

}

export default Statusbar;