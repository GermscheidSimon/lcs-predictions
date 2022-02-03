import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const PickEmGroupCard = (props) => {


    return (
        <div  className="groupCard" onClick={() => props.openGroup(props.pickEmGroup._id)}>
            <Card >
              <CardActionArea sx={{height: 100}} >

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Group: {props.pickEmGroup.name}
                    
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pro League: {props.pickEmGroup.league.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
        </div>  
    );
}

export default connect(mapStoreToProps)(PickEmGroupCard);