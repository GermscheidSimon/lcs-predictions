/**
 * groupData --
 *   
 * 
 * 
 */

 const groupData = (state = {events: []}, action) => {
    switch (action.type) {
      case 'SET_GROUP':
        return action.payload;
      default:
        return state;
    }
  };

  
  // playlist will be on the redux state at:
  // store.playlist
  export default groupData;