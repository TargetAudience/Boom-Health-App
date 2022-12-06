import { StackActions, NavigationActions } from 'react-navigation';

let navigator;

const setTopLevelNavigator = navigatorRef => {
  navigator = navigatorRef;
};

const navigateReset = (routeName, params) => {
  navigator.setState({
    params
  });
  const resetAction = StackActions.reset({
    index: 0,
    key: undefined,
    actions: [NavigationActions.navigate({ routeName, params })]
  });
  navigator.dispatch(resetAction);
};

const navigate = (routeName, params) => {
  navigator.setState({
    params
  });
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};

const getSafeParams = (paramName = null) => {
  const { params } = navigator.state;
  if (params !== undefined && params !== null) {
    if (paramName != null) {
      const value = params[paramName];
      return value;
    }
    return params;
  }
  return null;
};

const removeSafeParams = () => {
  navigator.setState({
    params: null
  });
};

const getCurrentRoute = () => {
  let route = navigator.state.nav;
  while (route.routes) {
    route = route.routes[route.index];
  }
  return route;
};

export default {
  navigate,
  setTopLevelNavigator,
  getSafeParams,
  removeSafeParams,
  getCurrentRoute,
  navigateReset
};
