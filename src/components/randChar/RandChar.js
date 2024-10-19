import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import style from './RandChar.module.scss';

class RandChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {   
        this.updateChar();
    }
    
    onCharLoaded = (char) => {   
        this.setState({char, loading: false});
    }

    onError = () => {
        this.setState({error: true, loading: false});
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }

    updateChar = () => {
        
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.onCharLoading();

        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        
        const {char, loading, error} = this.state;

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? <View char={char}/> : null; 

        return(
            <section className={style.randChar} >
                {spinner}
                {errorMessage}
                {content}
                <div className={style.randCharChoice}>
                    <div className={style.choiceTextContainer}>
                        <p className={style.choiceText}>
                            Random character for today!<br />
                            Do you want to get to know him better?
                        </p>
                        <p className={style.choiceText}>
                            Or choose another one
                        </p>
                    </div>
                    <button className={style.buttonRedDark}
                            onClick={this.updateChar}>
                        TRY IT
                    </button>
                    <img src='./resources/img/hammer.png' alt="Thor's hammer" className={style.hammer} />
                </div>
            </section>
        );
    }
}

const View = ({ char: { thumbnail, name, description, homepage, wiki}}) => {
    
    const emptyDescription = 'There is no description for this superhero :(';

    return (
        <div className={style.randCharInfo}>
            <img src={thumbnail} alt="Marvel's hero" className={thumbnail.includes('image_not_available') ? style.noImage : style.image} />
            <div className={style.text}>
                <h3 className={style.title}>{name}</h3>
                <p className={style.description}>{description ? description : emptyDescription}</p>
                <div className={style.info}>
                    <a href={homepage} className={style.buttonRedRand}>HOMEPAGE</a>
                    <a href={wiki} className={style.buttonGrayRand}>WIKI</a>
                </div>
            </div>
        </div>
    );
}

export default RandChar;