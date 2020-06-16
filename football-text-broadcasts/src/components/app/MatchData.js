import React  from 'react';
import Player from './Player';
import MatchLog from './MatchLog';
import TournamentLogs from './TournamentLogs';

const MatchData = ({totalLogs,matchData,players}) => {
  return (
    <div className="row">
      <div className="col-lg-1">
      </div>
      <div className="col-lg-8">
        <div className="toast show" aria-live="assertive" aria-atomic="true">
          {matchData.map((item, index) => {
            return <TournamentLogs value={item} key={index}/>;
          })}
        </div>
        {totalLogs.map((item, index) => {
          return <MatchLog value={item} key={index}/>;
        })}
      </div>
      <div className="col-lg-3">
        <div className="table-responsive">
          <table className="table head-table-style">
            <thead>
              <tr>
                <th><h3>{players.team1.title}</h3></th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th><h5 className="font-weight-bold">Основной состав</h5></th>
              </tr>
            </thead>
            <tbody>
              {players.team1.players.map(player => (
                <Player value={player} key={player.number} />
              ))}
            </tbody>
            <thead>
              <tr>
                <th><h5 className="font-weight-bold">Запасные игроки</h5></th>
              </tr>
            </thead>
            <tbody>
              {players.team1.spare.map(player => (
                <Player value={player} key={player.number} />
              ))}
            </tbody>
          </table>
          <table className="table head-table-style">
            <thead>
              <tr>
                <th className="table-title-dicoration"><h3>{players.team2.title}</h3></th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th><h5 className="font-weight-bold">Основной состав</h5></th>
              </tr>
            </thead>
            <tbody>
              {players.team2.players.map(player => (
                <Player value={player} key={player.number} />
              ))}
            </tbody>
            <thead>
              <tr>
                <th><h5 className="font-weight-bold">Запасные игроки</h5></th>
              </tr>
            </thead>
            <tbody>
              {players.team2.spare.map(player => (
                <Player value={player} key={player.number} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MatchData;
