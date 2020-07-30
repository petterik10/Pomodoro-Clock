import React from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const Timer = (props) => {
  return (
    <div className="col-6">
      <h6> {props.title} </h6>
      <div className="button-wrapper">
        <button className="" onClick={props.handleDecrease}>
          <RemoveIcon />
        </button>
        <span> {props.count} </span>
        <button onClick={props.handleIncrease}>
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default Timer;
