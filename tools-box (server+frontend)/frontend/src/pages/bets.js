import React from 'react';
import BetsForm from '../components/from-bets';

const Bets = () => {
    return (
        <div className="jumbotron">
            <div className="container">
                <h1 className="display-4">Calculate you Bets</h1>
                <BetsForm/>
            </div>
        </div>
    );
};

export default Bets;