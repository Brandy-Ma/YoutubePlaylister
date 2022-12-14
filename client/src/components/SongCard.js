import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index, playlist } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            console.log("This is working");
            store.showEditSongModal(index, song);
        }
    }
    const divStyle ={
        // background:'url(https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)', 
        // backgroundSize:"cover", 
        // backgroundRepeat:"no-repeat" 
        overflow: 'hidden',
        backgroundColor :"#333080",
        color:"white"
    }
    let cardClass = "list-card unselected-list-card";



//   console.log(JSON.stringify(playlist) + "SADDWASDAWSDAWSDWASDWASD")
// playlist.published.isPublish == true is how I return a different list card
    let songCards =  <Box
            style={ divStyle }
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
        >
            {index + 1}.
            {song.title} by {song.artist}
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleRemoveSong}
            />
            </Box>


    if(playlist.published.isPublished === true)
    {
       
        songCards=
        <Box
            style={ divStyle }
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}

        >
            {index + 1}.
            {song.title} by {song.artist}
        </Box>
    }


    return (
            
        songCards
        

    );
}

export default SongCard;