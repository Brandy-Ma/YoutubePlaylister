import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.unmarkListForDeletion();
    }

    return (
        <Modal
            open={store.listMarkedForDeletion !== null}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                    Delete the {name} Playlist?
                </header>
                <div id="confirm-cancel-container">
                    <Button
                        id="dialog-yes-button"
                        className="modal-button"
                        variant="contained"
                        onClick={handleDeleteList}
                    >Confirm</Button>
                    <Button
                        id="dialog-no-button"
                        className="modal-button"
                        variant="contained"
                        onClick={handleCloseModal}
                    >Cancel</Button>
                </div>
            </div>
            </Box>
        </Modal>
    );
}