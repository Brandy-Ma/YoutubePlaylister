import { useContext } from 'react'
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { AlertTitle, Button, Collapse } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    //p: 4,
};

export default function MUIAlertModal() {
    const { auth } = useContext(AuthContext);
    function closeMessage(event) {
        auth.closeMessage();
    }
    return (
        <Modal
            open={auth.errorMessage !== ""}
        >
            <Box sx={style}>
                <Alert severity="error"  >
                    <AlertTitle>Error</AlertTitle>
                    {auth.errorMessage}
                    <Button
                        sx = {{m:2}}
                        variant="contained"
                        flex-dirextion = "column"
                        onClick={closeMessage}
                    >Confirm</Button>
                </Alert>
            </Box>
        </Modal>
    );
}