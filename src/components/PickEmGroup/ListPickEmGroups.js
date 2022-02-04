import React, {useEffect, useState}  from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import PickEmGroupCard from './PickEmGroupCard';
import CreatePickEm from './CreatePickEm'

import { useNavigate } from 'react-router-dom';


function ListPickEmGroups(props) {

    const Navigate = useNavigate()

    useEffect(() => {
        props.dispatch({
            type: "FETCH_PICKEM_GROUP"
        })
    }, [])

    const handleGoToGroup = (groupID) => {
        console.log(groupID);
        Navigate(`/pickEmGroup/${groupID}`, {replace: true})
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
