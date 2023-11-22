import { StatusBar } from "expo-status-bar";
import { useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Home } from "./screens/Home";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const SplashScreenHide = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreenHide();
    }, 100);
  }, []);
  return (
    <>
      <StatusBar style="auto" hidden />
      <Home />
    </>
  );
};

export { App };
