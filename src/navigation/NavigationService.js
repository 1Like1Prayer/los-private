import { CommonActions, DrawerActions } from '@react-navigation/native';

let navigator;

function setNavigator(ref) {
  navigator = ref;
}

function navigate(routeName, params) {
  navigator.dispatch(CommonActions.navigate(routeName, params));
}

function openDrawer() {
  navigator.dispatch(DrawerActions.openDrawer())
}

export { navigate, openDrawer, setNavigator };
