import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandChar from '../randChar/RandChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBandary from '../errorBandary/ErrorBandary';

import style from './App.module.scss';

class App extends Component {

    state = {
        selectedChar: null
    }

    onSelectedChar = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    onFocusSelectedChar = (e, id) => {
        if (e.key === 'Enter') {
            this.onSelectedChar(id)
        }
    }

    render() {
        return (
            <div className={style.app}>
                <AppHeader />
                <main>
                    <RandChar />
                    <div className={style.content}>
                        <CharList onSelectedChar={this.onSelectedChar}
                                  onFocusSelectedChar={this.onFocusSelectedChar}/>
                        <ErrorBandary>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBandary>
                    </div>
                    <img src="./resources/img/bgDecoration.png" alt="A super hero" className={style.bgDecoration} />
                </main>
            </div>
        );
    }
}

export default App;