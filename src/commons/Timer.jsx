import { useEffect, useState } from "react";
import "styles/commons/Timer.scss";
const CustomTimer = ({ setIsLeft }) => {
  const [time, setTime] = useState(5 * 60);
  useEffect(() => {
    if (time <= 0) {
      setIsLeft(false);
      return;
    }

    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [time, setIsLeft]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <>
      {setIsLeft && (
        <div className="timer">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
      )}
    </>
  );
};

export default CustomTimer;
