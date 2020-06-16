import React from 'react';

const TournamentLogs = ({value}) => {
  return (
    <div>
      <div className="toast-header">
        <strong className="mr-auto">Текстовая онлайн трансляция матча {value.team1} против {value.team2}</strong>
      </div>
      <div className="toast-body">
        <div className="row">
          <div className="col-lg-1" />
          <div className="col-lg-5 team-align">
            <div>
              <h1>{value.team1}</h1>
            </div>
            <div>
            <img className="item-image"
              src={value.team1Logo}
              alt="team1"/>
            </div>
          </div>
          <div className="col-lg-5 team-align">
            <div>
              <h1>{value.team2}</h1>
            </div>
            <div>
            <img className="item-image"
              src={value.team2Logo}
              alt="team2"/>
            </div>
          </div>
          <div className="col-lg-1" />
        </div>
        <div className="team-align">
          <h2> {value.tournament} </h2>
          <h4> Стадион: {value.stadium} ({value.city}) </h4>
          <h4> {value.dataTime} </h4>
        </div>
      </div>
    </div>
  );
};

export default TournamentLogs;
