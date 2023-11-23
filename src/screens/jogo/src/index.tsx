import { StatusBar } from "expo-status-bar";
import { useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Home } from "./screens/Home";

SplashScreen.preventAutoHideAsync();

const App = ({navigation, route} :any) => {
  const SplashScreenHide = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
console.log(route.params.horario)
  useEffect(() => {
    setTimeout(() => {
      SplashScreenHide();
    }, 100);
  }, []);
  return (
    <>
      <StatusBar style="auto" hidden />
      <Home  background={ route.params.horario } />

    </>
  );
};

export { App };
