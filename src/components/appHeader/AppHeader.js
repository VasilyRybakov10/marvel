import style from './AppHeader.module.scss';

const AppHeader = () => {
    return (
        <header className={style.header}>
            <h1 className={style.title}><span className={style.marked}>Marvel</span> information portal</h1>
            <nav className={style.navigation}>
                <ul className={style.list}>
                    <li className={style.listItem}>
                        <a href="youtube.com" className={style.anchor}>Characters</a>
                    </li>
                    <span className={style.itemSep}>/</span>
                    <li className={style.listItem}>
                        <a href="google.com" className={style.anchor}>Comics</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;