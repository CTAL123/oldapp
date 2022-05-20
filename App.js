import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/route/navigationService';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AuthRoute from './src/route/authRoute';
import reducers from './src/reducers/index';
import LoadingIndicator from './src/components/loadingIndicator';
import Toast from 'react-native-toast-message';
import SuccessAnimation from './src/components/successAnimation';

const App = () => {
  const store = createStore(reducers);

  return (
    <Provider store={store}>
      <LoadingIndicator />
      <SuccessAnimation />
      <NavigationContainer ref={navigationRef}>
        <AuthRoute />
        <Toast ref={ref => Toast.setRef(ref)} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
