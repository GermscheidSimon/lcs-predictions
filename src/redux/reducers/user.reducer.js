const userReducer = (state = {
    render: "DEFAULT"
}, action) => {
    switch (action.type) {
      case 'SET_USER':
        return action.payload;
      case 'UNSET_USER':
        return {
            render: "COMPLETE"
        };
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default userReducer;