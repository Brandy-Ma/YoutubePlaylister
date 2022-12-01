import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleAddNewSong() {

        // store.addNewSong();
    }
    function handleUndo() {

       // store.undo();
    }
    function handleRedo() {

       // store.redo();
    }
    function handleClose() {

       // store.closeCurrentList();
    }
    return (
        <Box id="edit-toolbar">

            <IconButton
                disabled={false}
                onClick={handleAddNewSong}
                class = "editToolbar-button"
                >
                    <HomeOutlinedIcon />
            </IconButton>
            
            <IconButton 
                disabled={false}
                onClick={handleUndo}
                class = "editToolbar-button"
                >   
                <GroupsOutlinedIcon/>
            </IconButton>

            <IconButton 
                disabled={false}
                onClick={handleRedo}
                class = "editToolbar-button"
                >
                    <PersonOutlineOutlinedIcon />
            </IconButton>
            
                

            
            <IconButton 
                disabled={false}
                id = "sort-by"
                class = "editToolbar-button"
                onClick={handleClose}
                >
                <SortOutlinedIcon />
            </IconButton>
            <Box id = "sort-by-box">
                Sort By
            </Box>
            <Box id = "search-field">
            <TextField
            id="search-textField"
            label="Search field"
            type="search"
            variant="filled"
            sx = {{width:'80ch', marginRight: '10px', m: 1 }}
            />
            {/* backgroundColor:'white' */}
            </Box>
        </Box>
    )
            
}

export default EditToolbar;