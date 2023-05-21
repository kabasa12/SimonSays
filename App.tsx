import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { StatusBar } from "react-native";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'black'} barStyle="light-content"></StatusBar>
      <AppNavigator />
    </Provider>
  )
}


export default App;