import React, {useEffect, useState}  from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import PickEmGroupCard from './PickEmGroupCard';
import CreatePickEm from './CreatePickEm'

function ListPickEmGroups(props) {

    const fetchLeagueSchedule = async () => {
        await props.dispatch({
            type: "FETCH_PICKEM_GROUP",
            payload: "LCS"
        });

    }
    useEffect(async () => {
        await fetchLeagueSchedule()
    }, [])

    const handleGoToGroup = (groupID) => {
        console.log(groupID);
        props.history.push(`/pickEmGroup/${groupID}`)
    }
    

  return (
    <div className="ListPickEmGroups">
        {
            props.store.pickEmGroup &&
                props.store.pickEmGroup.map( (group) => {
                    return <PickEmGroupCard 
                                pickEmGroup={group}
                                key={group._id}
                                openGroup={handleGoToGroup}
                            />
                })
            
            
        }
        <CreatePickEm />
    </div>
  );
}

export default connect(mapStoreToProps)(ListPickEmGroups); 
