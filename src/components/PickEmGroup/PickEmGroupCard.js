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
            <Card sx={{ maxWidth: 350, minHeight: 275 }}>
              <CardActionArea sx={{ maxWidth: 350, minHeight: 275 }}>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Group Name: {props.pickEmGroup.name + '\n'}
                    Pro League: {props.pickEmGroup.league + '\n'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   {JSON.stringify(props.pickEmGroup)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
    );
}

export default connect(mapStoreToProps)(PickEmGroupCard);