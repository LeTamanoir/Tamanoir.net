import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import Loading from "./Loading";

export default function TransitionRoutes({ location, route, children }) {
  const [currLocation, setCurrLocation] = useState(location);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (location.pathname === currLocation.pathname) return;

    // if going to index dont show loader
    if (route === "") {
      setCurrLocation(location);
      return;
    }

    setLoad(true);
  }, [location]);

  return (
    <>
      {load && (
        <Loading
          start={load}
          stop={() => {
            setLoad(false);
            setCurrLocation(location);
          }}
        />
      )}
      <div className={load ? "hidden" : "w-full flex justify-center"}>
        <Routes location={currLocation}>{children}</Routes>
      </div>
    </>
  );
}
