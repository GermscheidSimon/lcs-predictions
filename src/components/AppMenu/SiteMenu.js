import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';



const SiteMenu = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const handleJoinGruopOpen =() => {
        handleMenuClose()
        handleOpen()
    }
  
    const [modalOpen, setModalState] = React.useState(false);
    const handleOpen = () => setModalState(true);
    const handleClose = () => setModalState(false);

    const [joinCodeField, setCodeField] = React.useState('')

    const handleJoinGroup = () => {
        handleClose()
        props.dispatch({
            type: "JOIN_GROUP",
            payload: joinCodeField
        })
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        backgroundColor: "#242424"
      };

    return( 
        <div>
            <IconButton
            onClick={handleMenuClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
        >
            <MenuIcon />
        </IconButton>
                <Menu
                id="long-menu"
                MenuListProps={{
                'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                    style: {
                        width: '20ch'
                    },
                }}
            >
                <MenuItem key={'joinGroupThing'} onClick={handleJoinGruopOpen}>
                    Join Group
                </MenuItem>
            </Menu>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                   Enter Join Code: 
                </Typography>
                <Stack spacing={2} direction="row">
                    <TextField id="filled-basic" label="Filled" variant="filled" onChange={(event) => setCodeField(event.target.value)}/>
                    <Button variant="text" onClick={handleJoinGroup}>Join</Button>
                </Stack>
                </Box>
            </Modal>
        </div>
    )
}
export default connect(mapStoreToProps)(SiteMenu);