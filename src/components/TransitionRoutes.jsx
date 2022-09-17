import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import Loading from "./Loading";

export default function TransitionRoutes({ location, route, children }) {
  const [currLocation, setCurrLocation] = useState(location);
  const [load, setLoad] = useState(false);
  const { hasToLoad } = useLoading();

  useEffect(() => {
    if (hasToLoad === null || location.pathname === currLocation.pathname) {
      return;
    }

    if (hasToLoad(location.pathname)) setLoad(true);

    setCurrLocation(location);
  }, [location]);

  return (
    <>
      {load && <Loading start={load} stop={() => setLoad(false)} />}
      <div className={load ? "hidden" : "w-full flex justify-center"}>
        <Routes location={currLocation}>{children}</Routes>
      </div>
    </>
  );
}
