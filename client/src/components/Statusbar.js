import { useContext } from 'react'
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
    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    function handleCreateNewList() {
        store.createNewList();
    }
    return (
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
        </Box>
    );
}

export default Statusbar;