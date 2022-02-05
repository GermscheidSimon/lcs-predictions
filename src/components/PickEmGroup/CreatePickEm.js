import React, { Component }  from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';

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
import ListItemButton from '@mui/material/ListItemButton';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    crossDomain: true
  }
  

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

class CreatePickEm extends Component{

    state = {
        leagues: [],
        tourns: [],
        open: false,
        chosenLeague: null,
        chosenTourn: null,
        renderFinishOpt: false,
        groupName: ''
    }
    fetchLeagues =  () => {

          axios.get('https://pro-lague-api.herokuapp.com/api/schedule/fetchLeagues')
              .then((res) => {
                  this.setState({
                      ...this.state,
                      leagues: res.data.data.leagues
                  })
              })
              .catch((err) => {
                  console.log(err)
          })
    }
    handleOpen = () => {
        this.fetchLeagues()
        this.setState({
            ...this.state,
            open: true
        })         
    }
    handleClose = () => {
        this.setState({
            leagues: [],
            tourns: [],
            open: false,
            chosenLeague: null,
            chosenTourn: null,
            renderFinishOpt: false,
            groupName: ''
        })         
    }
    handleLeagueSelected = (event, li) => {
        axios.get(`https://pro-lague-api.herokuapp.com/api/schedule/fetchTournByLeageID/${li.id}`)
        .then((res) => {
            this.setState({
                ...this.state,
                tourns: res.data.data.leagues[0].tournaments,
                chosenLeague: li
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    handleTournSelected = (event, li) => {
        this.setState({
            ...this.state,
            chosenTourn: li,
            renderFinishOpt: true
        })
    }
    finishSetup = () => {
        const pickEm = {
            league: this.state.chosenLeague,
            tourn: this.state.chosenTourn,
            groupName: this.state.groupName
        }
        axios.post(`https://pro-lague-api.herokuapp.com/api/pickEmGroup/createNewGroup`, pickEm)
        .then((res) => {
            this.handleClose()
        })
    }
    handleChaneGroupName = (event) => {
        this.setState({
            ...this.state,
            groupName: event.target.value
        })
    }
    render(){
        return(
            <div>
            <PickEmCard handleOpen={this.handleOpen} className="groupCard"/>
            <Modal
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
                Create Pick-Em Group
            </Typography>
            <PickEmGroupDetails handleChaneGroupName={this.handleChaneGroupName}/>
                {
                    this.state.chosenLeague === null ?
                        <LeaguePicker leagues={this.state.leagues} handleSelectLeague={this.handleLeagueSelected}/>
                    :
                        <TournPicker tourns={this.state.tourns} handleTournSelected={this.handleTournSelected}/>
                    }
                {
                    this.state.renderFinishOpt ? 
                        <Finish FinishSetup={this.finishSetup}/>
                        :
                        <></>
                }
            </Box>
            </Modal>
        </div>
        )
    };
}


const PickEmCard = (props) => {
    return (
        <div className="groupCard">
            <Card sx={{height: 100}}>
              <CardActionArea onClick={() => props.handleOpen()} sx={{height: 100}}>

                <CardContent>
               
                  <Typography gutterBottom variant="h5" component="div">
                    New Group
                  </Typography>
                    
                </CardContent>
              </CardActionArea>
            </Card>
        </div>
    );
}



const LeaguePicker = (props) => {
    return(
        <>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Choose a Pro League:
            </Typography>
                <List sx={{ width: '100%', maxWidth: 600, maxHeight: 400, bgcolor: 'background.paper', overflow: 'auto' }}>
                    {
                        props.leagues.length > 0 ?
                        props.leagues.map((li) => {
                            return (
                                <ListItem>
                                    <ListItemButton onClick={(event) => props.handleSelectLeague(event, li)}>
                                        <ListItemAvatar>
                                            <Avatar src={li.image}>
                                                
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={li.name} secondary={li.region} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                        :
                        <div>loading leagues ...</div>
                    }
                
                </List>
        </>             
    )
}

const TournPicker = (props) => {
    return(
        <>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Choose a tournament:
            </Typography>
                <List sx={{ width: '100%', maxWidth: 600, maxHeight: 400, bgcolor: 'background.paper', overflow: 'auto' }}>
                    {
                        props.tourns.length > 0 ?
                        props.tourns.map((li) => {
                            return (
                                <ListItem>
                                    <ListItemButton onClick={(event) => props.handleTournSelected(event, li)}>

                                        <ListItemText primary={li.slug} secondary={li.startDate} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                        :
                        <div>loading tournaments ...</div>
                    }
                
                </List>
        </>             
    )
}
const PickEmGroupDetails = (props) => {
    return(
        <>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
               PickEm' Group Details:
            </Typography>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField id="outlined-basic" label="Group Name" variant="outlined" onChange={(event) => props.handleChaneGroupName(event)}/>
                </div>
                
            </Box>
        </>             
    )
}

const Finish = (props) => {
    return(
        <Button 
            variant="contained"
            onClick={props.FinishSetup}
            >
            Finish
        </Button>
    )
}


export default connect(mapStoreToProps)(CreatePickEm); 
