import React, {useEffect, useState}  from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './AppStatusBar.css'

const messageType = {
    default: "Default",
    error: "Error",
    loading: "Loading", 
    success: "Success"
}



function AppStatusBar(props) {

    const [renderStatus, setRenderStatus] = useState(false)
    const [statusType, setStatusType] = useState('Default')
    const [statusMessage, setMessage] = useState(':(')
    
    useEffect(() => {
        createStatusMessage()
    }, [props.store.appStatus.statusMessage])

    const createStatusMessage = () => {
        const newStatus = props.store.appStatus
        if(newStatus.render) {
            setRenderStatus(true)
            setStatusType(newStatus.statusType)
            setMessage(newStatus.statusMessage)
        } else if(!newStatus.render) {
            setRenderStatus(false)
            setStatusType(newStatus.statusType)
            setMessage(newStatus.statusMessage)
        }
    }
  return (
    <div >
        {
            renderStatus ?
                <div className={`AppStatusBar ${statusType}`}>
                    <div className='appStatusMessage'>
                        {statusMessage}
                    </div>
                </div>
            :
                <></>
        }
      
    </div>
  );
}

export default connect(mapStoreToProps)(AppStatusBar); 
