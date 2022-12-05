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
import AuthContext from '../auth'

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    function handleAllListview() {
        store.updateView("allList")
        document.getElementById("search-textField").value = ""
        // store.addNewSong();
    }
    function handleUsersview() {
        store.updateView("users")
        document.getElementById("search-textField").value = ""
       // store.undo();
    }
    function handleHomeview() {
        store.updateView("home")
        store.loadIdNamePairs()
        document.getElementById("search-textField").value = ""
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

    function handleSortAZ (event) {
        event.stopPropagation();
        store.handleSortAZ()
        handleMenuClose(event)
    }

    function handleSortPublishDate (event){
        event.stopPropagation();
        store.handleSortPublishDate()
        handleMenuClose(event)
    }

    function handleSortListens (event) {
        event.stopPropagation();
        store.handleSortListens()
        handleMenuClose(event)
    }

    function handleSortlikes (event) {
        event.stopPropagation();
        store.handleSortlikes()
        handleMenuClose(event)
    }

    function handleSortDislike (event) {
        event.stopPropagation();
        store.handleSortDislike()
        handleMenuClose(event)
    }
    

    const sortMenu = 
            <Menu
                anchorEl={anchorEl}
                id='sort-by-menu'
                keepMounted
                
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={(event) => {handleSortAZ(event )}}>Name(A-Z)</MenuItem>
                <MenuItem onClick={(event) => {handleSortPublishDate(event)}}>Publish Date (Newest)</MenuItem>
                <MenuItem onClick={(event) => { handleSortListens(event)}}>Listens(High-Low)</MenuItem>
                <MenuItem onClick={(event) => { handleSortlikes(event)}}>Likes(High-Low)</MenuItem>
                <MenuItem onClick={(event) => {handleSortDislike(event)}}>Dislikes(High-Low)</MenuItem>
            </Menu>    

            const buttonClass = {
                height: '100%',
                width: '5%',
                backgroundColor: "transparent",
                marginLeft: '5px',
                marginRight: '5px',
                transform: 'scale(3)',
            }
    
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            if(store.currentView ==='users')
            {
                store.loadIdPairsSearchUser();
            }
            else if(store.currentView ==='allList')
            {
                store.loadIdPairsSearch();
            }
            else{
                store.loadIdNamePairsHomeSearch()
            }
            

        }
    }


    let searchTextField ="";
      

        searchTextField = 
        <TextField
            id="search-textField"
            label="Search field"
            type="search"
            variant="filled"
            sx = {{width:'70ch', marginRight: '10px', m: 1, height:"auto" }}
            style = {{backgroundColor:'white'}}
            onKeyPress= {handleKeyPress}
        />

    return (
        <Box id="edit-toolbar" style={{backgroundColor:'transparent'}}>

            <IconButton
                disabled={(store.guestAccountt===true)||(auth.loggedIn===false)}
                onClick={handleHomeview}
                class = "editToolbar-button"
                sx ={buttonClass}
                variant='text'
                >
                    <HomeOutlinedIcon  sx={{transform: 'scale(2)'}}/>
            </IconButton>
            
            <IconButton 
                disabled={false}
                onClick={handleAllListview}
                class = "editToolbar-button"
                sx ={buttonClass}
                >   
                <GroupsOutlinedIcon sx={{transform: 'scale(2)'}}/>
            </IconButton>

            <IconButton 
                disabled={false}
                onClick={handleUsersview}
                class = "editToolbar-button"
                sx ={buttonClass}
                >
                    <PersonOutlineOutlinedIcon sx={{transform: 'scale(2)'}}/>
            </IconButton>
            
                

            
            <IconButton 
                disabled={false}
                id = "sort-by"
                class = "editToolbar-button"
                onClick={handleOpenSortByMenu}
                sx ={buttonClass}
                >
                <SortOutlinedIcon sx={{transform: 'scale(2)'}}/>
                {
                    sortMenu
                }
            </IconButton>
            <Box id = "sort-by-box">
                Sort By
            </Box>
            <Box id = "search-field">
            {searchTextField}
            </Box>
        </Box>
    )
            
}

export default EditToolbar;