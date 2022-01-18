/**
 * Schedule --
 *   
 * 
 * 
 */

 const schedule = (state = [], action) => {
    switch (action.type) {
      case 'SET_SCHEDULE':
        return action.payload;
      default:
        return state;
    }
  };

  
  // playlist will be on the redux state at:
  // store.playlist
  export default schedule;