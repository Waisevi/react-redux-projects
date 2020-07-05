import React, {useState, useContext, useEffect} from 'react';
import { AlertContext } from '../../context/alert/alertContext';
import './converter.css';

const Converter = () => {
    const alert = useContext(AlertContext);

    const [inCurrency, setInCurrency] = useState('RUB');
    const [outCurrency, setOutCurrency] = useState('RUB');

    const [dataCurr, setDataCurr] = useState('');
    
    useEffect(() => {
        fetch(`https://api.exchangeratesapi.io/latest?base=${inCurrency}`)
        .then((response) => response.json())
        .then((data) => setDataCurr(data.rates[`${outCurrency}`]))
        .catch(() => console.log('some error'));
        
        return () => console.log('clear');
    },[inCurrency,outCurrency]);

    const [valueIn, setValueIn] = useState('');
    const [valueOut, setValueOut] = useState('');

    function resConv() {
        if(valueIn !== ''){
            const resultCurr = valueIn * dataCurr
            setValueOut(resultCurr.toFixed(2))
        } else {
            alert.show('Введите сумму');
            setTimeout(alert.hide, 2000);
        }
    }

    return (
        <form>
            <div className="form-row">
                <div className="col-lg-5">
                    <select value={inCurrency} onChange={e => setInCurrency(e.target.value)}>
                        <option value="RUB">Рубль</option>
                        <option value="EUR">Евро</option>
                        <option value="USD">Доллар</option>
                        <option value="AUD">Австралийский доллар</option>
                        <option value="CZK">Чешская крона</option>
                    </select>
                    <input 
                        type="number" 
                        className="form-control mt-1" 
                        value={valueIn}
                        onChange={event => setValueIn(event.target.value)}
                    />
                </div>
                <div className="col-lg-2 convert">
                    <button type="button" className="btn btn-info" onClick={()=> resConv()}>Convert</button>
                </div>
                <div className="col-lg-5">
                    <select value={outCurrency} onChange={e => setOutCurrency(e.target.value)}>
                        <option value="RUB">Рубль</option>
                        <option value="EUR">Евро</option>
                        <option value="USD">Доллар</option>
                        <option value="AUD">Австралийский доллар</option>
                        <option value="CZK">Чешская крона</option>
                    </select>
                    <input 
                        type="number" 
                        className="form-control mt-1" 
                        disabled={true}
                        value={valueOut}
                    />
                </div>
            </div>
        </form>
    );
};

export default Converter;