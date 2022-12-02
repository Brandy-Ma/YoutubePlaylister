import React from 'react';
import YouTube from 'react-youtube';
import { Box, Button } from '@mui/material';
import { GlobalStoreContext } from '../store'


export default function YoutubePlaylister() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    //Just so my shit doesn;t break atm
    let player = "";


    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [
        "mqmxkGjow1A",
        "8RbXIMZmVv8",
        "8UbNbor3OqQ"
    ];

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        height: '200',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }
    function decSong() {
        currentSong--;
        console.log(currentSong);
        if(currentSong == -1)
        {
          currentSong = playlist.length-1;
        }
        currentSong = currentSong % playlist.length;
      }
      
    

function onPlayerReady(event) {
    player = event.target
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
}

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    function previousSong(){
        decSong();
        loadAndPlayCurrentSong(player);
    }
    
    function nextSong(){
        incSong();
        loadAndPlayCurrentSong(player);
    }
    
    function pauseSong(){
        player.pauseVideo();
    }
    
    function playSong(){
        player.playVideo();
    }

    return <Box>
        <YouTube
        videoId={playlist[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />
        <Box id ="Playlister-buttons">
            <Button onClick={previousSong}> Rewind </Button>
            <Button onClick={pauseSong}> Pause </Button>
            <Button onClick={playSong}> Play </Button>
            <Button onClick={nextSong}> Skip </Button>
        </Box>
            
    </Box>        
        
    
       
        
}