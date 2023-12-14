import React from 'react';


const ProgressBar = (props) => {
    const { pv, pvMax, faType, bgType, barName } = props;
  
    return (
      <div className="progress md-progress">
        <div
          className="progress-bar"
          style={{ width: (pv * 100 / pvMax) + "%" }}
          aria-valuenow={pv}
          aria-valuemin="0"
          aria-valuemax={pvMax}
          role="progressbar"
        >
          <i className={` fas ${faType} ${bgType} icon-text`}>
            {pv} {barName}
          </i>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;