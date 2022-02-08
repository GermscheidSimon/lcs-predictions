/**
 * appStatus --
 *   
 * 
 * 
 */
const statusMessage = {
    default: "Default",
    error: "Error",
    loading: "Loading", 
    success: "Success"
}

const defaultState = {
    render: false,
    statusMessage: ':(',
    statusType: statusMessage.default,
    renderTimeout: 0
}
const appStatus = (state = {
     render: false,
     statusMessage: ':(',
     statusType: statusMessage.default,
     renderTimeout: 0
 }, action) => {
    switch (action.type) {
        case 'SET_APP_STATUS':
            return action.payload;
        case 'UNSET_STATUS':
            return defaultState;
      default:
        return state;
    }
  };

  export default appStatus;