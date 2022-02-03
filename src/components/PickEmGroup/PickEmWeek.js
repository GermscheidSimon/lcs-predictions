import { useEffect, useState } from "react";
import PickEmMatch from "./PickEmMatch";
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';


const PickEmWeek = (props) => {

    const handlePrediction = (matchID, winner) => {
        const matchPrediction = {
            matchID: matchID,
            victor: winner
        }
        const otherPredictions = weekPrediction.predictions.filter(match => match.matchID !== matchPrediction.matchID)
        setPrediction({
            ...weekPrediction, 
            predictions: [...otherPredictions, {
                matchID: matchID,
                victor: winner
            }]
        })
    }
    const [weekPrediction, setPrediction] = useState({
        groupID: props.store.group._id,
        username: props.store.user.username,
        week: props.week.index,
        predictions: []
    })
    const [isCurWeek, setisCur] = useState(false)
    const [editMode, setEditMode] = useState(false)


    useEffect(() => {
        props.dispatch({
            type: "FETCH_TEAMS",
            payload: props.store.group.tourn.id
        });
        setisCur(props.isCurrentWeek(props.weekIndex))
        
        const predictions = props.store.group.predictions
        if(predictions !== undefined && predictions.length > 0 ) {
            for (const prediction of predictions) {
                if(prediction.username === props.store.user.username && prediction.week === props.week.index){
                    setPrediction(prediction)
                }
            }
        }
      }, [props.store.group.predictions])

    const updatePrediction = () => {
        setEditMode(false)
        props.dispatch({
            type: "UPDATE_PREDICTION",
            payload: weekPrediction
        })
    }

    

    return (
        <div  className="PickEmWeek">
            {
                isCurWeek ? 
                <div>
                    <IconButton aria-label="edit" color="primary" onClick={() => setEditMode(!editMode)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="save" color="primary" onClick={() => updatePrediction()}>
                        <SaveIcon />
                    </IconButton>
                </div>

                :
                <></>
            }

            {
                props.store.teams.length > 0 && props.week ?
                    
                    props.week.matches.map( (el) => {
                        let matchPreds = weekPrediction.predictions
                        let matchprediction = {
                            matchID: null,
                            victor: null
                        }
                        for (const match of matchPreds) {
                            if(el.id === match.matchID){
                                matchprediction = match
                            }
                        }

                        return ( 

                            <div key={el.id + 'team'}>
                                <PickEmMatch match={el} prediction={handlePrediction} isCurWeek={isCurWeek} editMode={editMode} userPrediction={matchprediction} />
                                <Divider light />
                            </div>
                        )
                    })
                :
                <></>
            }
        </div>  
    );
}

export default connect(mapStoreToProps)(PickEmWeek);