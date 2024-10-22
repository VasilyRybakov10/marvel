import { useState, useEffect } from 'react';

import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

import style from './CharInfo.module.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    const updateChar = () => {
        
        const charId = props.charId;

        if (!charId) {
            return;
        }

        onCharLoading();

        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const skeleton = !(char || loading || error) ? <Skeleton/> : null;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !char) ? <View char={char}/>
        : null;

    return (
        <div className={style.charInfo}>
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    );

}

const View = ({char: {thumbnail, name, homepage, wiki, description, comicList}}) => {

    return(
        <aside className={style.sideBar}>
            <div className={style.wrapper}>
                <img src={thumbnail} alt={name} className={thumbnail.includes('image_not_available') ? style.noImage : style.image} />
                <div className={style.info}>
                    <h3 className={style.name}>{name}</h3>
                    <div className={style.links}>
                        <a href={homepage} className={style.buttonRedInfo}>HOMEPAGE</a>
                        <a href={wiki} className={style.buttonGrayInfo}>WIKI</a>
                    </div>
                </div>
                <p className={style.text}>
                    {description ? description : 'There is no description for this superhero :('}
                </p>
            </div>
            <div className={style.comics}>
                <h3 className={style.title}>Comics:</h3>
                <ul className={style.list}>
                    {comicList.length > 0 ? comicList.slice(0, 10).map((comic, i) => {
                        return (
                            <li key={i} className={style.item}>
                                {comic.name}
                            </li>
                        )
                    }) : <p className={style.noInfo}>There is no comics for this superhero :/</p>}
                </ul>
            </div>
        </aside>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;