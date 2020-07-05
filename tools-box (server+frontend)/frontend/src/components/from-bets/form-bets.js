import React, {useState, useContext} from 'react';
import { AlertContext } from '../../context/alert/alertContext';

const BetsForm = () => {
    const [bet, setBet] = useState('');
    const [coef, setCoef] = useState('');
    const [result, setResult] = useState('');

    const alert = useContext(AlertContext);

    function betResult() {
        if (bet && coef !== '') {
            const result = bet * coef;
            setResult(result.toFixed(2));
        } else {
            setResult('');
            alert.show('Ставка или коэффициент не могут быть пустым');
            setTimeout(alert.hide, 2000);
        }
    }

    return (
        <form>
            <div className="form-row">
                <div className="col-lg-5">
                    <strong>Place you bets</strong><br/>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={bet} 
                        onChange={event => setBet(event.target.value)}
                    />
                </div>
                <div className="col-lg-1">
                    <strong>Сoef</strong><br/>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={coef} 
                        onChange={event => setCoef(event.target.value)}
                    />
                </div>
                <div className="col-lg-5">
                    <strong>Possible Win</strong><br/>
                    <input type="text" className="form-control" disabled={true} value={result} />
                </div>
                <div className="col-lg-1">
                    <br/>
                    <button type="button" className="btn btn-info" onClick={()=>betResult()}>Count</button>
                </div>
            </div>
        </form>
    );
};

export default BetsForm;