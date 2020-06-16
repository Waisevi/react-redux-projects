import React  from 'react';
import Header from '../header';
import useData from '../../services/dataServices.js';
import MatchData from './MatchData';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';

const App = () => {
  const [
    totalLogs,
    matchData,
    players,
    refresMatchData
  ] = useData();

  return (
    <Router>
      <Header/>
      <MatchData totalLogs={totalLogs} matchData={matchData} players={players}/>
    </Router>
  )
};

export default App;
