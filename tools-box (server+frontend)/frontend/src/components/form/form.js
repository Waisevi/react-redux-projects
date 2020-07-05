import React, {useState, useContext} from 'react';
import { AlertContext } from '../../context/alert/alertContext';

const Form = ({onItemAdd}) => {
    const [value, setValue] = useState('');
    const alert = useContext(AlertContext);

    const submitHandler = event => {
        event.preventDefault();

        if (value.trim()) {
            onItemAdd(value);
            alert.show('Заметка успешно добавлена', 'success');
            setValue('');
        } else {
            alert.show('Введите текст заметки');
        }

        setTimeout(alert.hide, 2000);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Inter you note"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </form>
    );
};

export default Form;