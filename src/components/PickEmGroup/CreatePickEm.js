import React  from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import PickEmGroupCard from './PickEmGroupCard';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const fetchLeagues = () => {

}
const fetchLeagueTournaments = () => {

}
const postNewPickEmGroup = () => {
    
}

function CreatePickEm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (


    <div>
        <PickEmCard handleOpen={handleOpen}/>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
                Create Pick-Em Group
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Choose a Pro League:
            </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Work" secondary="Jan 7, 2014" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                            <BeachAccessIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vacation" secondary="July 20, 2014" />
                    </ListItem>
                </List>
            </Box>
        </Modal>
    </div>
  );
}

const PickEmCard = (props) => {
    return (
            <Card>
              <CardActionArea  sx={{ maxWidth: 350, minHeight: 275 }} onClick={() => props.handleOpen()}>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   Create new Pick-Em Group
                  </Typography>
                    
                </CardContent>
              </CardActionArea>
            </Card>
    );
}


export default connect(mapStoreToProps)(CreatePickEm); 
