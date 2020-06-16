import React from "react";

const matchIcons = {
  "goal": "fa fa-bolt text-danger",
  "dangerousMoment": "fa fa-fire text-danger",
  "yellowCard": "fa fa-flag text-warning",
  "replacePlayer": "fa fa-share text-danger",
  "redCard": "fa fa-flag text-warning"
};

const MatchLog = ({ value }) => {
  const iconClass = value.type in matchIcons ? matchIcons[value.type] : "fa fa-info text-info";

  return (
    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className="mr-auto"><i className={iconClass} /></strong>
        <small>{value.time} минут</small>
      </div>
      <div className="toast-body">
        {value.description}
      </div>
    </div>
  );
};

export default MatchLog;
