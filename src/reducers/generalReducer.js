const initialState = {
  userInfo: '',
  internetStatus: true,
  loadingStatus: false,
  loading: false,
  successAnimation: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'loading':
      return {...state, loading: true};
    case 'success':
      return {
        ...state,
        loading: false,
      };
    case 'successAnimation':
      return {
        ...state,
        successAnimation: action.payload,
      };
    case 'updateUserInfo':
      return {
        ...state,
        userInfo: {
          ...action.payload,
        },
      };
    case 'updateProfileCreation':
      return {
        ...state,
        profileCreation: {
          ...action.payload,
        },
      };

    case 'internetConnectionStatus':
      return {
        ...state,
        internetStatus: action.payload,
      };
    default:
      return state;
  }
};
