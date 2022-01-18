/**
 * pickEmGroup --
 *   
 * 
 * 
 */

 const pickEmGroup = (state = [], action) => {
    switch (action.type) {
      case 'SET_PICKEM_GROUP':
        return action.payload;
      default:
        return state;
    }
  };

  
  // playlist will be on the redux state at:
  // store.playlist
  export default pickEmGroup;