/*  Creating a Pomodoro clock to break work time into time blocks "Sessions", 
separated by break time. */

import React from "react";
import Timer from "./Timer";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import RefreshIcon from "@material-ui/icons/Refresh";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";

class App extends React.Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    time: 25 * 60,
    sessionName: "Session",
    intervalId: null,
  };
  render() {
    const { time, sessionName } = this.state;
    const isStarted = this.state.intervalId !== null;
    const audio = new Audio(
      "https://www.soundjay.com/button/sounds/beep-01a.mp3"
    );

    const timeConverter = (time) => {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return `${minutes}:${seconds}`;
    };

    const handlePlayAndPause = () => {
      const { intervalId } = this.state;
      if (isStarted) {
        clearInterval(intervalId);
        this.setState({
          intervalId: null,
        });
      } else {
        const newIntervalId = setInterval(() => {
          const { time, sessionName, breakLength, sessionLength } = this.state;
          if (time === 0) {
            audio.play();
            this.setState({
              sessionName: sessionName === "Session" ? "Break" : "Session",
              time:
                sessionName === "Session"
                  ? breakLength * 60
                  : sessionLength * 60,
            });
          } else {
            this.setState({
              intervalId: newIntervalId,
              time: time - 1,
            });
          }
        }, 1000);
      }
    };

    const handleResetButton = () => {
      const { intervalId } = this.state;
      clearInterval(intervalId);
      audio.pause();
      audio.currentTime = 0;
      this.setState({
        breakLength: 5,
        sessionLength: 25,
        time: 25 * 60,
        sessionName: "Session",
        intervalId: null,
      });
    };

    const handleBreakDecrease = () => {
      const { breakLength } = this.state;
      if (breakLength < 2) return;
      if (!isStarted && sessionName === "Break") {
        this.setState({
          breakLength: breakLength - 1,
          time: (breakLength - 1) * 60,
        });
      } else {
        this.setState({
          breakLength: breakLength - 1,
        });
      }
    };

    const handleBreakIncrease = () => {
      const { breakLength } = this.state;
      if (breakLength > 59) return;
      if (!isStarted && sessionName === "Break") {
        this.setState({
          breakLength: breakLength + 1,
          time: (breakLength + 1) * 60,
        });
      } else {
        this.setState({
          breakLength: breakLength + 1,
        });
      }
    };

    const handleSessionDecrease = () => {
      const { sessionLength } = this.state;
      if (sessionLength < 2) return;
      if (!isStarted && sessionName === "Session") {
        this.setState({
          sessionLength: sessionLength - 1,
          time: (sessionLength - 1) * 60,
        });
      } else {
        this.setState({
          sessionLength: sessionLength - 1,
        });
      }
    };

    const handleSessionIncrease = () => {
      const { sessionLength } = this.state;
      if (sessionLength > 59) return;
      if (!isStarted && sessionName === "Session") {
        this.setState({
          sessionLength: sessionLength + 1,
          time: (sessionLength + 1) * 60,
        });
      } else {
        this.setState({
          sessionLength: sessionLength + 1,
        });
      }
    };

    return (
      <div>
        <h1 id="title">Pomodoro Clock</h1>
        <div className="time-container">
          <h1>{this.state.sessionName}</h1>
          <span>{timeConverter(time)}</span>
          <p>
            {sessionName === "Session" ? (
              <AccessTimeIcon style={{ fontSize: 60 }} />
            ) : (
              <FreeBreakfastIcon style={{ fontSize: 60 }} />
            )}
          </p>
          <button id="play_and_pause" onClick={handlePlayAndPause}>
            {isStarted ? (
              <PauseCircleOutlineIcon style={{ fontSize: 40 }} />
            ) : (
              <PlayCircleOutlineIcon style={{ fontSize: 40 }} />
            )}
          </button>
          <button id="reset" onClick={handleResetButton}>
            <RefreshIcon style={{ fontSize: 40 }} />
          </button>
        </div>

        <div className="container">
          <div className="row">
            <Timer
              title="Break Length"
              count={this.state.breakLength}
              handleDecrease={handleBreakDecrease}
              handleIncrease={handleBreakIncrease}
            />
            <Timer
              title="Session Length"
              count={this.state.sessionLength}
              handleDecrease={handleSessionDecrease}
              handleIncrease={handleSessionIncrease}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
