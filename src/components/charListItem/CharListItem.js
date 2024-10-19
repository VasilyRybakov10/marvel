import {Component} from 'react';

import style from './CharListItem.module.scss';

class CharListItem extends Component {

    getCharRef = (element) => {
        this.charRef = element;
    }

    setFocus = () => {
        this.charRef.focus();
    }

    render() {

        const {charId, name, img } = this.props;

        return (
            <li className={style.item}
                tabIndex={0}
                ref={this.getCharRef}
                onClick={() => { this.props.onSelectedChar(charId) }}
                onKeyPress={(e) => { this.props.onFocusSelectedChar(e, charId) }}
                onFocus={this.setFocus}>
                <img src={img} alt={name} className={img.includes('image_not_available') ? style.noImage : style.image} />
                <div className={style.titleContainer}>
                    <p className={style.name}>{name}</p>
                </div>
            </li>
        );
    }
}

export default CharListItem;