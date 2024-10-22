import {useRef} from 'react';

import style from './CharListItem.module.scss';

const CharListItem = (props) => {

    const charRef = useRef(null);

    const {charId, name, img } = props;

    return (
        <li className={style.item}
            tabIndex={0}
            ref={(e) => charRef.current = e}
            onClick={() => { props.onSelectedChar(charId) }}
            onKeyPress={(e) => { props.onFocusSelectedChar(e, charId) }}
            onFocus={() => {charRef.current.focus()}}>
            <img src={img} alt={name} className={img.includes('image_not_available') ? style.noImage : style.image} />
            <div className={style.titleContainer}>
                <p className={style.name}>{name}</p>
            </div>
        </li>
    );
}

export default CharListItem;