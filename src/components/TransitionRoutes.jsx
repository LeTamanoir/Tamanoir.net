import { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import Loading from "./Loading";
import useLoading from "../hooks/useLoading";

export default function TransitionRoutes({ location, children }) {
  const [currLocation, setCurrLocation] = useState(location);
  const [load, setLoad] = useState(false);
  const { showLoad } = useLoading();

  useEffect(() => {
    if (location.pathname === currLocation.pathname) return;

    if (location.pathname !== "/" && showLoad === "true") setLoad(true);

    setCurrLocation(location);
  }, [location, showLoad]);

  return (
    <>
      {load && <Loading start={load} stop={() => setLoad(false)} />}
      <div className={load ? "hidden" : "w-full flex justify-center"}>
        <Routes location={currLocation}>{children}</Routes>
      </div>
    </>
  );
}
