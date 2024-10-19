import style from './Skeleton.module.scss';

const Skeleton = () => {
    return (
        <div className={style.skeleton}>
            <h3 className={style.title}>
                Please select a character to see information
            </h3>
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.circle}></div>
                    <div className={style.mini}></div>
                </div>
                <div className={style.block}></div>
                <div className={style.block}></div>
                <div className={style.block}></div>
            </div>
        </div>
    );
}

export default Skeleton;