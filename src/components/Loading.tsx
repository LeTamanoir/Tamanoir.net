import React, { useEffect, useState } from "react";

const Loading: React.FC<{ start: boolean; stop: () => void }> = ({
  start,
  stop,
}) => {
  const [progress, setProgress] = useState(0);

  const end = 20;

  useEffect(() => {
    if (start) setProgress(1);
  }, [start]);

  useEffect(() => {
    if (progress === end) {
      setProgress(0);
      stop();
      return;
    }

    if (progress > 0) {
      setTimeout(() => {
        setProgress((e) => e + 1);
      }, 35);
    }
  }, [progress]);

  return (
    <div className="mt-40 flex justify-center">
      <span className="no-ligatures text-xl">
        {"[" +
          Array(20)
            .fill(0)
            .map((_, i) => (i >= progress ? "-" : "#"))
            .join("") +
          "]"}
      </span>
    </div>
  );
};

export default Loading;
