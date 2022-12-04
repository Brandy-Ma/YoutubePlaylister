import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Box, IconButton, Typography } from '@mui/material'
import Fab from '@mui/material/Fab'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {

    const { store } = useContext(GlobalStoreContext);
    
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
        <Typography varient = "h2">barText</Typography>
        </Box>
    );

    



    let name = store.currentView
    console.log( store.currentView)
    useEffect( ()=> {
        
        if( store.currentView !== "home")
        {
            // name = document.getElementById("search-textField").value
            setStatusbar(<Box id="playlister-statusbar">
                {name}
            </Box>)
        }
        else {
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
            <Typography varient = "h5" style={{fontSize: "24pt"}}>Your List</Typography>
            </Box>)
        }
    }, [store.currentView]);
   

    function handleCreateNewList() {
        store.createNewList();
    }


    return statusBar

}

export default Statusbar;