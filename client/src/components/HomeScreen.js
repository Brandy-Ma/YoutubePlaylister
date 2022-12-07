import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import AuthContext from '../auth'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material';
import EditToolbar from './EditToolbar';
import AppBanner from './AppBanner';
import Statusbar from './Statusbar'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import YoutubePlaylister from '../common/YoutubePlaylister.js';
import TextField from '@mui/material/TextField';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        
      >
        {value === index && (
          <Box sx={{ p: 3, }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }





const HomeScreen = () => {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        if(auth.loggedIn)
        {
            store.loadIdNamePairs();
            updateSearch()
        }

    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    const [search, setSearch] = useState(store.searchWord)




    let listCard = "";
    if (store) {
        
        listCard = 
            <List sx={{ width: '99%', left: '0%', background:'transparent' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

    const [value, setValue] = React.useState('2');

    useEffect(() => {
        // Update the document title using the browser API
        if(value == 2)
        {
            setValue(0);
        }
        updateSearch()
      });

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.addComments();
            document.getElementById("comment-textField").value = "";
        }
    }

    // const commentCard = store.currentList.comments((comment, index) => (
    //         <Box>
    //         {comment.comment} by {comment.user}
    //         </Box>
    //         )) 
    
    const comments = [];
    let newTextField = "";
    if(store.listeningList && store.listeningList.published && store.listeningList.published.isPublished && auth.loggedIn)
    {
        newTextField = 
        <TextField
            id = "comment-textField"
            margin="normal"
            sx={{width:"100%"}}
            inputProps={{style: {fontSize: 48}}}
            InputLabelProps={{style: {fontSize: 24}}}
            onKeyPress= {handleKeyPress}
        />
    }
   
    const updateSearch = (event)  => {
        setSearch(store.searchWord)
    }
    
    
    let homeScreen = 
    <Box id="playlist-selector">
            
            <AppBanner /> 
            <EditToolbar >

            </EditToolbar>
            
                {/* <Typography variant="h3">Your Lists</Typography> */}
            
            <Box id="list-selector-list">
                {
                    listCard
                    
                }
                <MUIDeleteModal />
            </Box>

            <Box id = "list-selector-list-right" bgcolor = 'transparent' >
                <Box sx={{ width: '100%', overflowX:'hidden'}}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{p:1}}>
                        <Tab label="Player"  {...a11yProps(1)} sx={{backgroundColor:"white"}} />
                        <Tab label="Comments" {...a11yProps(1) } sx={{backgroundColor:"white"}}/>
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}  >
                    <Box id = "Player-Tab"  >
                            <YoutubePlaylister></YoutubePlaylister>
                     </Box>
                    </TabPanel>
                    
                    <TabPanel value={value} index={1} >
                        <Box style={{border:'2px solid black', backgroundColor: 'white'}}
                        sx ={{width: 1, display:'column'}}>
                            <Box sx ={{width: 1, height: '45vh', display:'column'}}>
                                <List 
                                    sx={{ width: '100%', bgcolor: 'background.paper'}}
                                    >
                                    {
                                        
                                    }
                                        
                                    
                                </List>
                            </Box>
                            <Box sx ={{bottom:'100%', width: 1}}
                            >
                                {newTextField}
                            </Box>
                        </Box>
                    </TabPanel>
                </Box>
            </Box>
            <Statusbar search = {search}></Statusbar>
        </Box>

    if(store.listeningList && store.listeningList.comments && store.listeningList.published.isPublished)
    {
        //console.log(JSON.stringify(store.idNamePair) + "THIS IS OFF RENDesdesdeER")
        //console.log(JSON.stringify(store.listeningList) + "THIS IS OFF RENDER ASDHADJASDJKASKJDS")
        homeScreen = 
        <Box id="playlist-selector">
            <AppBanner /> 
            <EditToolbar>

            </EditToolbar>
            
                {/* <Typography variant="h3">Your Lists</Typography> */}
            
            <Box id="list-selector-list">
                {
                    listCard
                    
                }
                <MUIDeleteModal />
            </Box>

            <Box id = "list-selector-list-right" bgcolor = 'white' >
                <Box sx={{ width: '100%', overflowX:'hidden'}}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Player"  {...a11yProps(1)}/>
                        <Tab label="Comments" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        
                        <Box id = "Player-Tab">
                                <YoutubePlaylister></YoutubePlaylister>
                        </Box>
                    </TabPanel>
                    
                    <TabPanel value={value} index={1}>
                        <Box style={{border:'2px solid black', backgroundColor: 'white'}}
                        sx ={{width: 1, display:'column'}}>
                            <Box sx ={{width: 1, height: '45vh', display:'column'}}>
                                <List 
                                    sx={{ width: '100%', bgcolor: 'background.paper', overflowY:"auto", maxHeight:'43vh', height:'auto'}}
                                    >
                                    {
                                        store.listeningList.comments.map((comment, index) => (
                                            <Box 
                                            style ={{backgroundColor:'#e8c205', border: '3px solid black', borderRadius:' 5px', marginBottom: '10px', flexGrow:1, overflowWrap:' break-word'}}
                                            >
                                                <Box 
                                                style= {{color:'blue'}}>
                                                    {comment.user}
                                                </Box>
                                                {comment.comment}  
                                            </Box>
                                        ))  
                                    }
                                          
                                    
                                </List>
                            </Box>
                            <Box sx ={{bottom:'100%', width: 1}}
                            >
                                {
                                    newTextField
                                }
                            </Box>
                        </Box>
                    </TabPanel>
                </Box>
            </Box>
            <Statusbar search = {search}></Statusbar>
        </Box>
    }


    return (

        homeScreen

        )
}

export default HomeScreen;