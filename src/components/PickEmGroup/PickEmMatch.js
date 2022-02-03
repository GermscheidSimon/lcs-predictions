
import {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import predictionIcon from './PredictionIcons';



import { CardActionArea } from '@mui/material';

const PickEmMatch = (props) => {

    const [value, setValue] = useState(0);
    const theme = useTheme();
    const [leftTeam, setleft] = useState({wins: 0, losses: 0})
    const [rightTeam, setRight] = useState({wins: 0, losses: 0})
    const [lefteamPrediction, setLeftPred] = useState(null)
    const [righteamPrediction, setrightPred] = useState(null)

    const [disabled, setDisabled] = useState(true)
    const match = props.match

    const findRecord = () => {
        const leftTeamObj = props.match.teams[0]
        const rightTeamObj = props.match.teams[1]
        let leftRec = findTeam(leftTeamObj)
        let rightRec = findTeam(rightTeamObj)

        setleft(leftRec)
        setRight(rightRec)
    }
    const findTeam = (teamOBj) => {
        const standings = props.store.teams
        for(const team of standings) {
            if(team.name === teamOBj.name) {

                return team.record
            }
        }
    }

    useEffect(() => {

        if( props.store.teams.length > 0 ){

            findRecord()
        }
        if(props.editMode && disabled === true){
            setDisabled(false)
        } 

        let teams = match.teams
        for (const team of teams) {
            if (props.userPrediction.victor !== null){
                if(team.code === props.userPrediction.victor.code){
                   if(team.code === match.teams[0].code) {
                        setLeftPred(true)
                        setrightPred(false)
                   } else {
                    setLeftPred(false)
                    setrightPred(true)
                   }
                }
            }
        }

      }, [props.editMode, props.userPrediction])

    const handlePrediction = (team, side, match) => {
        if (props.editMode) {
                
            if(side === 'left'){
                setLeftPred(true)
                setrightPred(false)
            } else {
                setLeftPred(false)
                setrightPred(true)
            }
            props.prediction(match.id, team)
        }
    }

    return (
        <div  className="PickEmMatch">
            <Box sx={{ display: 'flex',  justifyContent: 'center', backgroundColor: '#2a2a2a', color: 'white'}}>
                <Box>
                        {lefteamPrediction === null ?
                            <p>n/a</p>
                            : lefteamPrediction ?
                                
                                predictionIcon.loss()
                            :
                                predictionIcon.win()
                        }
                    </Box>
                <Box onClick={() => handlePrediction(match.teams[0], 'left', match)}>
                   
                    <CardActionArea disabled={disabled}  sx={{ display: 'flex', flexDirection: 'row', margin: '1%', paddingRight: '1.3%', width:'400px', textAlign: 'right', justifyContent:'flex-end'}} >

                           <CardContent sx={{alignItems: 'right'}}>
                            <Typography component="div" variant="h5">
                                    {match.teams[0].name}
                                </Typography>
                                <Typography variant="subtitle1" component="div" sx={{color: 'white' }}>
                                    {leftTeam.wins} - {leftTeam.losses}
                                </Typography>
                           </CardContent>
                            <CardMedia
                                component="img"
                                sx={{ width: 45 }}
                                image={match.teams[0].image}
                                alt={`${match.teams[0].name} team Banner`}
                            />

                    </CardActionArea>
                </Box>
                <Box sx={{width: '4%', textAlign: 'center',  paddingLeft: '5px'}}>
                    <div className='match-VS-text'>
                        <Typography variant='h6' component="div"  sx={{color: 'white'}}>
                                VS.
                        </Typography>
                    </div>
                </Box>
                <Box onClick={() => handlePrediction(match.teams[1], 'right', match)}>
                    <CardActionArea disabled={disabled}  sx={{  display: 'flex', flexDirection: 'row-reverse', margin: '1%', paddingRight: '1%', width:'400px', textAlign: 'left', justifyContent:'flex-end'}}>
                            <CardContent sx={{alignItems: 'left'}}>
                                <Typography component="div" variant="h5">
                                    {match.teams[1].name}
                                </Typography>
                
                                {
                                    props.store.teams.length > 0 ?
                                        <Typography variant="subtitle1" component="div"  sx={{color: 'white' }}>
                                        {rightTeam.wins} - {rightTeam.losses}
                                        </Typography>
                                    :
                                    <></>
                                }
                                 
                                
                                
                            </CardContent>
                            <CardMedia
                                component="img"
                                sx={{ width: 45 }}
                                image={match.teams[1].image}
                                alt={`${match.teams[1].name} team Banner`}
                            />
                    </CardActionArea>  
                    
                </Box>
                <Box>
                    {
                        righteamPrediction  === null ?
                            <p>n/a</p>
                        : righteamPrediction ?       
                            predictionIcon.loss()
                        :
                            predictionIcon.win()
                    }
                </Box>
            </Box>
        </div>  
    );
}



export default connect(mapStoreToProps)(PickEmMatch)