import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  navigationRef.navigate(name, params);
}

function push(name, params) {
  navigationRef.push(name, params);
}

// for not going back
function navigateReset(name, params) {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name, params}],
    }),
  );
}

function back() {
  navigationRef.goBack();
}

export default {
  navigate,
  push,
  navigateReset,
  back,
};
