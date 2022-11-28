import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material';
import EditToolbar from './EditToolbar';
import AppBanner from './AppBanner';
import Statusbar from './Statusbar'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
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
    return (
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
            
            </Box>
            <Statusbar></Statusbar>
        </Box>
        )
}

export default HomeScreen;