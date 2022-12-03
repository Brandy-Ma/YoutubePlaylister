
import YouTube from 'react-youtube';
import { Box, Button } from '@mui/material';
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import IconButton from '@mui/material/IconButton';


export default function YoutubePlaylister() {
    const { store } = useContext(GlobalStoreContext);
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    const [player, setPlayer] = useState("")

    // const [songNub, setSongNumb] = useState(0);
    // const [title, setTitle] = useState("");
    // const [artist, setArtist] = useState("");
    
    
    let songNub = 0;
    let title = "";
    let artist = "";


    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [];
    if(store.listeningList)
    {
        if(store.listeningList.songs)
        {
            for(let i =0; i<store.listeningList.songs.length; i++)
            {
                playlist.push(store.listeningList.songs[i].youTubeId);
            }
        }
    }
    let songs = [];
    if(store.listeningList)
    {
        if(store.listeningList.songs)
        {
            for(let i =0; i<store.listeningList.songs.length; i++)
            {
                songs.push(store.listeningList.songs[i]);
            }
        }
    }
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        height: '400',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT


    function loadAndPlayCurrentSong(player) {
        console.log(songs.length + "                  asdasassadadasdasdasdadasddasd songs.legnth")
        if(songs.length>0){
            // setSongNumb(currentSong + 1);
            // setTitle(songs[currentSong].title)
            // setArtist(songs[currentSong].artist)
            document.getElementById("playlistName").innerHTML = "Playlist: "+ (store.listeningList.name);
            document.getElementById("songNumber").innerHTML = "Song #: "+ (currentSong +1);
            document.getElementById("titleName").innerHTML = "Title: "+ songs[currentSong].title;
            document.getElementById("artistName").innerHTML = "Artist: "+ songs[currentSong].artist;
            // songNub = currentSong +1
            // title = songs[currentSong].title
            // artist = songs[currentSong].artist
            // console.log(songNub + " " + title+" "+artist+"    asdasddasasassaasdas        ")
        }
        let song = playlist[currentSong];
        console.log(currentSong + " THIS IS WHAT CURRENT SONG IS IN LOAD AND PLAY")
        player.loadVideoById(song);
        player.playVideo();
        
    }

    

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        ++currentSong;
        console.log("THIS IS HAPPMEINGGGGGG inc" + currentSong)
        currentSong = currentSong % playlist.length;
    }

    function decSong() {
        --currentSong;
        console.log("THIS IS HAPPMEINGGGGGG dec"+ currentSong)
        if(currentSong == -1)
        {
          currentSong = playlist.length-1;
        }
        currentSong = currentSong % playlist.length;
      }
      
    

function onPlayerReady(event) {
    // player = event.target
    setPlayer(event.target)
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
}

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        // player = event.target;
        setPlayer(event.target)
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
            player.playVideo()
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
    const buttonStyles ={
        width: "10%",
        height: "5vh",
        marginLeft:"13%",
        marginRight: "2%",
        fontSize: "inherit",
        color:"blue",
        transform: 'scale(2)'
    }
    

    let youtubePlayer ="";
    if(playlist.length > 0)
    {
        //console.log("this is happening")
        youtubePlayer = 
            <Box  >
                <Box sx = {{pointerEvents:'none'}}>
                    <YouTube
                    videoId={playlist[currentSong]}
                    opts={playerOptions}
                    onReady={onPlayerReady}
                    onStateChange={onPlayerStateChange} 
                    />
                    <Box sx ={{marginBottom:'3%', overflow:'auto'}}>
                        <div id = "playlistName"></div>
                        <div id = "songNumber"></div>
                        <div id = "titleName"></div>
                        <div id = "artistName"></div>
                        {/* Playlist: {store.currentList.name}
                        <br></br>
                        Song #: {songNub}
                        <br></br>
                        Title: {title}
                        <br></br>
                        Artist: {artist} */}
                    </Box>
                </Box>
                <Box id ="Playlister-buttons" sx={{fontSize:"50px"}}>
                    
                    <IconButton onClick={previousSong} sx= {buttonStyles}> <FastRewindIcon ></FastRewindIcon></IconButton>
                    <IconButton onClick={pauseSong} sx= {buttonStyles}> <PauseIcon /> </IconButton>
                    <IconButton onClick={playSong} sx= {buttonStyles}> <PlayArrowIcon></PlayArrowIcon> </IconButton>
                    <IconButton onClick={nextSong} sx= {buttonStyles}> <FastForwardIcon></FastForwardIcon> </IconButton>
                </Box>
            </Box>
    }
    else
    {
        youtubePlayer = 
            <Box>
                No songs
            </Box>
    }

    return youtubePlayer;
        
    
       
        
}