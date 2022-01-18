import React, {useEffect, useState}  from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

function PickEmGroup(props) {
    const [groups, setGroup] = useState("")


    const fetchLeagueSchedule = async () => {
        await props.dispatch({
            type: "FETCH_PICKEM_GROUP",
            payload: "LCS"
        });
        setGroup(props.store.pickEmGroup)
    }
    useEffect(() => {
        fetchLeagueSchedule()
    }, [groups])

  return (
    <div className="PickEmGroup">
        {JSON.stringify(props.store.pickEmGroup)}
    </div>
  );
}

export default connect(mapStoreToProps)(PickEmGroup); 
