import { Component } from 'react';

import CharListItem from '../charListItem/CharListItem';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

import style from './CharList.module.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({ newItemsLoading: true })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) { ended = true }

        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({ error: true, loading: false })
    }

    renderItems = (charList) => {

        const items = charList.map(char => {

            const { id, name, thumbnail } = char;

            return <CharListItem key={id}
                charId={id}
                name={name}
                img={thumbnail}
                onSelectedChar={this.props.onSelectedChar}
                onFocusSelectedChar={this.props.onFocusSelectedChar}/>
        })

        return (
            <ul className={style.list}>
                {items}
            </ul>
        )
    }

    render() {

        const { charList, loading, error, newItemsLoading, offset, charEnded } = this.state;
        const items = this.renderItems(charList);

        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(loading || error) ? items : null;
        const button = !charEnded ? <Button loading={newItemsLoading}
            onRequest={this.onRequest}
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