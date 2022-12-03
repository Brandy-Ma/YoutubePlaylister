import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import SongCard from './SongCard.js';
import List from '@mui/material/List';
import { Button } from '@mui/material';
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'


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


    let publishedStyle = {};
    let isPublished = false;
    if(idNamePair.playlist)
    {   

        if(idNamePair.playlist.published)
        {
            console.log(idNamePair.playlist.published)
            if(idNamePair.playlist.published.isPublished === true)
            {
               
                isPublished = true;
            }
        }
    }

    if(isPublished === true){
        publishedStyle ={
            backgroundColor: 'pink'
        }
    }
    else
    {
        publishedStyle ={
            backgroundColor: 'orange'
        }
    }
    
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
            store.setIsListNameEditActive(store.currentList);
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

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    function handleDoubleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            handleToggleEdit(event);
        }
    }
    function handlePublish() {
        store.publishPlaylistCard();
     }
    function handleUndo() {

        store.undo();
     }
     function handleRedo() {
 
        store.redo();
     }
    //console.log(JSON.stringify(idNamePair.playlist) +" I AM GOING TO KILL MYSELFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
    let cardElement =
        <Box 
        style = {publishedStyle}>
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '15px', display: 'flex', p: 1, border:2, borderRadius: 0, borderColor:"white" }}
                style={{ width: '100%', fontSize: '48pt', color:"white"}}
            >
                <Box sx = {{display: 'table-column', p: 1, flexGrow: 1, width: 400, overflowY:'hidden', overflowX:'hidden' }}
                >
                    <Box sx={{ p: 1, flexGrow: 1, width: 400, overflowY:'hidden', overflowX:'hidden' }}
                    onClick={handleDoubleClick}
                    style={{fontSize:'24pt'}}>{idNamePair.name}
                    </Box>
                    <Box style={{fontSize:'10pt'}}
                    Box sx={{ p: 1, flexGrow: 1, width: 400, overflowY:'hidden', overflowX:'hidden' }}>
                        by:{idNamePair.playlist.ownerUsername}  
                    </Box>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                    handleLoadList(event, idNamePair._id)
                }}>
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'24pt'}} />
                </IconButton>
                </Box>
            
            </ListItem>
        </Box>
    //Here make it so the list card cannot do anything
    if(store.currentList && store.currentList.published && store.currentList.isPublished === true)
    {
        cardElement =
        <Box 
        style = {publishedStyle}>
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '15px', display: 'flex', p: 1, border:2, borderRadius: 0, borderColor:"white" }}
                style={{ width: '100%', fontSize: '48pt', color:"white"}}
            >
                <Box sx = {{display: 'table-column', p: 1, flexGrow: 1, width: 400, overflowY:'hidden', overflowX:'hidden' }}
                >
                    <Box sx={{ p: 1, flexGrow: 1, width: 400, overflowY:'hidden', overflowX:'hidden' }}
                    onClick={handleDoubleClick}
                    style={{fontSize:'24pt'}}>{idNamePair.name}
                    </Box>
                    <Box style={{fontSize:'10pt'}}
                    Box sx={{ p: 1, flexGrow: 1, width: 400, overflowY:'hidden', overflowX:'hidden' }}>
                    by:{idNamePair.playlist.ownerUsername}  
                </Box>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                    handleLoadList(event, idNamePair._id)
                }}>
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'24pt'}} />
                </IconButton>
                </Box>
            
            </ListItem>
        </Box>
    }
    else
    if (editActive) {
        cardElement =
        <Box >
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '15px', display: 'flex', p: 1, border:2, borderRadius: 0, borderColor:"white" }}
                style={{ width: '100%', fontSize: '48pt', color:"white"}}
            >
                <TextField
                margin="normal"
                required
                style = {{width: 400}}
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
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                    handleLoadList(event, idNamePair._id)
                }}>
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'24pt'}} />
                </IconButton>
                </Box>
            
            </ListItem>
        </Box>
            
    }
    else
    if(store.currentList!== null && store.currentList._id === idNamePair._id)
    {
        
        cardElement =
        <Box id = "list-opened"
        style = {publishedStyle}>
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
                    <Box sx = {{display: 'table-column', p: 1, flexGrow: 1, width: 400, overflowY:'hidden', overflowX:'hidden' }}
                >
                    <Box sx={{ p: 1, flexGrow: 1, width: 400, overflowY:'hidden', overflowX:'hidden' }}
                    onClick={handleDoubleClick}
                    style={{fontSize:'24pt'}}>{idNamePair.name}
                    </Box>
                        <Box style={{fontSize:'10pt'}}
                        Box sx={{ p: 1, flexGrow: 1, width: 400, overflowY:'hidden', overflowX:'hidden' }}>
                        by:{idNamePair.playlist.ownerUsername}  
                        </Box>
                </Box>
                    {/* <Box sx={{ p: 1 }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <EditIcon style={{fontSize:'48pt'}} />
                        </IconButton>
                    </Box> */}
                    <Box sx={{ p: 1 }}>
                    {/* <IconButton onClick={(event) => {
                        handleCloseList(event, idNamePair._id)
                    }}>
                        <KeyboardDoubleArrowUpIcon style={{fontSize:'24pt'}} />
                    </IconButton> */}

                    
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
                    sx={{ width: '100%', bgcolor: 'background.paper'}}
                    >
                    {
                        store.currentList.songs.map((song, index) => (
                            <SongCard
                                id={'playlist-song-' + (index)}
                                key={'playlist-song-' + (index)}
                                index={index}
                                song={song}
                                playlist={store.currentList}
                            />
                        ))  
                    }
                    <Box class= "list-card unselected-list-card" style={{textAlign:'center'}} onClick={handleAddNewSong}> + </Box>
                    </List>
                    
                </Box>
                <Box id = "fixed-Bottom">  
                    <ListItem >
                            <Button class="insideButtons" onClick={handlePublish}>Publish</Button>
                            <Button class="insideButtons" onClick ={handleUndo}>Undo</Button>
                            <Button class="insideButtons" onClick={handleRedo}>Redo</Button>
                            <Button class= "insideButtons" onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }}>Delete</Button>
                            <Button class="insideButtons" onClick={handleAddNewSong}>Duplicate</Button>
                            <IconButton onClick={(event) => {
                                handleCloseList(event, idNamePair._id)
                            }}>
                            <KeyboardDoubleArrowUpIcon style={{fontSize:'20pt'}} />
                            </IconButton>
                    </ListItem>
                </Box> 
                { modalJSX }
        </Box>

    }
    return (
        cardElement
    );
}

export default ListCard;