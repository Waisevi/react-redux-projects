import React from 'react';
import Converter from '../components/converter';

const Home = () => {
    return (
        <div className="jumbotron">
            <div className="container">
                <h1 className="display-4">Currency Converter</h1>
                <Converter/>
            </div>
        </div>
    );
};

export default Home;