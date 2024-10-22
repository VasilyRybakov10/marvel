import { useState } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandChar from '../randChar/RandChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBandary from '../errorBandary/ErrorBandary';

import style from './App.module.scss';

const App = (props) => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onSelectedChar = (id) => {
        setSelectedChar(id);
    }

    const onFocusSelectedChar = (e, id) => {
        if (e.key === 'Enter') {
            onSelectedChar(id)
        }
    }

    return (
        <div className={style.app}>
            <AppHeader />
            <main>
                <RandChar />
                <div className={style.content}>
                    <CharList onSelectedChar={onSelectedChar}
                                onFocusSelectedChar={onFocusSelectedChar}/>
                    <ErrorBandary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBandary>
                </div>
                <img src="./resources/img/bgDecoration.png" alt="A super hero" className={style.bgDecoration} />
            </main>
        </div>
    );
}

export default App;