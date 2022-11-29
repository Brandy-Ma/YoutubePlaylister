import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import SongCard from './SongCard.js';
import List from '@mui/material/List';
import { Button } from '@mui/material';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleCloseList(event, id) {
        console.log("handleCloseList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.closeCurrentList()
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    function handleAddNewSong() {

        store.addNewSong();
    }
    let cardElement =
        <Box >
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '15px', display: 'flex', p: 1, border:2, borderRadius: 0, borderColor:"white" }}
                style={{ width: '100%', fontSize: '48pt', color:"white"}}
                // onClick={(event) => {
                //     handleLoadList(event, idNamePair._id)
                // }}
            >
                <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                    handleLoadList(event, idNamePair._id)
                }}>
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'48pt'}} />
                </IconButton>
                    {/* <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='delete'>
                        <KeyboardDoubleArrowDownIcon style={{fontSize:'48pt'}} />
                    </IconButton> */}
                </Box>
            
            </ListItem>
        </Box>
    
    if(store.currentList!== null && store.currentList._id === idNamePair._id)
    {
        
        cardElement =
        <Box id = "list-opened">
                <ListItem
                    id={idNamePair._id}
                    key={idNamePair._id}
                    sx={{ marginTop: '15px', display: 'flex', p: 1, border:2, borderRadius: 0, borderColor:"white" }}
                    style={{ width: '100%', fontSize: '48pt', color:"white"}}
                    // button
                    // onClick={(event) => {
                    //     handleLoadList(event, idNamePair._id)
                    // }}
                >
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <EditIcon style={{fontSize:'48pt'}} />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleCloseList(event, idNamePair._id)
                    }}>
                        <KeyboardDoubleArrowDownIcon style={{fontSize:'48pt'}} />
                    </IconButton>

                    
                        {/* <IconButton onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                            <KeyboardDoubleArrowDownIcon style={{fontSize:'48pt'}} />
                        </IconButton> */}
                    </Box>
                
                </ListItem>
                <Box id = "list-Box">
                    <List 
                    id="playlist-cards" 
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                    >
                    {
                        store.currentList.songs.map((song, index) => (
                            <SongCard
                                id={'playlist-song-' + (index)}
                                key={'playlist-song-' + (index)}
                                index={index}
                                song={song}
                            />
                        ))  
                    }
                    </List>
                </Box>
                <Box id = "fixed-Bottom">  
                    <ListItem >
                            <Button class= "insideButtons" >Delete</Button>
                            <Button class="insideButtons" onClick={handleAddNewSong}>Add</Button>
                            <Button class="insideButtons">Edit</Button>
                    </ListItem>
                </Box> 
        </Box>
    }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;