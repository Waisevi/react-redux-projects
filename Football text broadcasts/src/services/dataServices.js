import React, { useState, useEffect } from 'react';
import data from './match_log.json';

function findPlayers(allPlayers, startPlayers) {
  let playLineups = [];
  let spareLineups = [];

  for(let i=0; i < allPlayers.length; i++) {
    if(startPlayers.includes(allPlayers[i].number)) {
      playLineups.push(allPlayers[i]);
    } else {
      spareLineups.push(allPlayers[i]);
    }
  }

  return [playLineups, spareLineups];
}

const useData = () => {
  const [totalLogs, setTotalLogs] = useState([]);
  const [tournamentInfo, setTournamentInfo] = useState([]);
  const [players, setPlayers] = useState({
    team1: {
      players: [],
      spare: [],
      title: ''
    },

    team2: {
      players: [],
      spare: [],
      title: ''
    }
  });

  function refresh() {
    //tournament info
    let tournament = [];

    const broadcastData = data.filter(d => d.type === "startPeriod" && d.details.length !== 0);
    const arrayData = broadcastData[0];

    let newItem = {
      dataTime: arrayData.details.dateTime,
      tournament: arrayData.details.tournament,
      country: arrayData.details.stadium.country,
      city: arrayData.details.stadium.city,
      stadium: arrayData.details.stadium.stadium,
      team1: arrayData.details.team1.title,
      team2: arrayData.details.team2.title,
      team1Logo: arrayData.details.team1.logo,
      team2Logo: arrayData.details.team2.logo
    };

    tournament.push(newItem);

    setTotalLogs(data);
    setTournamentInfo(tournament);

    //lineUps 1 team
    const [playLineups1, spareLineups1] = findPlayers(arrayData.details.team1.players, arrayData.details.team1.startPlayerNumbers);
    // setLineups1T(playLineups1);
    // setspareLineups1T(spareLineups1);

    //lineUps 2 team
    const [playLineups2, spareLineups2] = findPlayers(arrayData.details.team2.players, arrayData.details.team2.startPlayerNumbers);
    // setLineups2T(playLineups2);
    // setspareLineups2T(spareLineups2);

    setPlayers({
      team1: {
        players: playLineups1,
        spare: spareLineups1,
        title: arrayData.details.team1.title
      },
      team2: {
        players: playLineups2,
        spare: spareLineups2,
        title: arrayData.details.team2.title
      }
    });
  }

  useEffect(refresh, []);

  return [totalLogs, tournamentInfo, players, refresh];
};

export default useData;
