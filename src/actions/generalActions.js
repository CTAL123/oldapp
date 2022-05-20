export const updateUserInfo = userInfo => {
  return {
    type: 'updateUserInfo',
    payload: userInfo,
  };
};
export const updateUsers = users => {
  return {
    type: 'updateUsers',
    payload: users,
  };
};

export const loading = () => {
  return {
    type: 'loading',
  };
};

export const successAnimation = status => {
  return {
    type: 'successAnimation',
    payload: status,
  };
};
export const success = () => {
  return {
    type: 'success',
  };
};

export const internetConnectionStatus = status => {
  return {
    type: 'internetConnectionStatus',
    payload: status,
  };
};
