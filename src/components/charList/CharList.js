import { useState, useEffect } from 'react';

import CharListItem from '../charListItem/CharListItem';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

import style from './CharList.module.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemsLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) { ended = true }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const renderItems = (charList) => {

        const items = charList.map(char => {

            const { id, name, thumbnail } = char;

            return <CharListItem key={id}
                charId={id}
                name={name}
                img={thumbnail}
                onSelectedChar={props.onSelectedChar}
                onFocusSelectedChar={props.onFocusSelectedChar}/>
        })

        return (
            <ul className={style.list}>
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? items : null;
    const button = !charEnded ? <Button loading={newItemsLoading}
        onRequest={onRequest}
        offset={offset} /> : null;

    return (
        <section className={style.charList}>
            {spinner}
            {errorMessage}
            {content}
            {button}
        </section>
    );
}

const Button = ({ loading, onRequest, offset }) => {
    return (
        <button
            className={style.button}
            disabled={loading}
            onClick={() => { onRequest(offset) }}>
            LOAD MORE
        </button>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default CharList;