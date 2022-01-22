import React, {useEffect, useState}  from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import PickEmGroupCard from './PickEmGroupCard';
import CreatePickEm from './CreatePickEm'

function PickEmGroup(props) {

    const fetchLeagueSchedule = async () => {
        await props.dispatch({
            type: "FETCH_PICKEM_GROUP",
            payload: "LCS"
        });

    }
    useEffect(async () => {
        await fetchLeagueSchedule()
    }, [])

  return (
    <div className="PickEmGroup">
        {
            props.store.pickEmGroup &&
                props.store.pickEmGroup.map( (group) => {
                    console.log(group._id)
                    return <PickEmGroupCard pickEmGroup={group} />
                })
            
            
        }
        <CreatePickEm />
    </div>
  );
}

export default connect(mapStoreToProps)(PickEmGroup); 
