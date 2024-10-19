import style from './ErrorMessage.module.scss';

const ErrorMessage = () => {
    return (
        <img src="./resources/img/error.gif" alt="Error: no information about a superhero" className={style.error}/>
    );
}

export default ErrorMessage;