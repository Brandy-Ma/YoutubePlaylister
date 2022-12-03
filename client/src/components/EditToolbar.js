import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    function handleAddNewSong() {

        // store.addNewSong();
    }
    function handleUndo() {

       // store.undo();
    }
    function handleRedo() {

       // store.redo();
    }
    const handleOpenSortByMenu = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // handleMenuClose();
        // store.closeCurrentList();
        // auth.logoutUser();
    }

    const sortMenu = 
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id='sort-by-menu'
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>    

            const buttonClass = {
                height: '100%',
                width: '5%',
                backgroundColor: "transparent",
                marginLeft: '5px',
                marginRight: '5px',
                transform: 'scale(2)'
            }


    return (
        <Box id="edit-toolbar">

            <IconButton
                disabled={false}
                onClick={handleAddNewSong}
                class = "editToolbar-button"
                sx ={buttonClass}
                >
                    <HomeOutlinedIcon />
            </IconButton>
            
            <IconButton 
                disabled={false}
                onClick={handleUndo}
                class = "editToolbar-button"
                sx ={buttonClass}
                >   
                <GroupsOutlinedIcon/>
            </IconButton>

            <IconButton 
                disabled={false}
                onClick={handleRedo}
                class = "editToolbar-button"
                sx ={buttonClass}
                >
                    <PersonOutlineOutlinedIcon />
            </IconButton>
            
                

            
            <IconButton 
                disabled={false}
                id = "sort-by"
                class = "editToolbar-button"
                onClick={handleOpenSortByMenu}
                sx ={buttonClass}
                >
                <SortOutlinedIcon />
                {
                    sortMenu
                }
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
            sx = {{width:'70ch', marginRight: '10px', m: 1 }}
            />
            {/* backgroundColor:'white' */}
            </Box>
        </Box>
    )
            
}

export default EditToolbar;