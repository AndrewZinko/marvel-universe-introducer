import { useState, useEffect } from 'react';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {
    
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        clearError();
        const {charId} = props;
        if (!charId) return;

        getCharacter(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const unavailableImage = thumbnail.indexOf('image_not_available') > -1;
    const thumbnailStyles = unavailableImage ? {objectFit: 'contain'} : null;

    const comicsData = comics.slice(0, 9).map((item, index) => {
        return (
            <li key={index} className="char__comics-item">
                {item.name}
            </li>
        );
    });

    return (
        <>
            <div className="char__basics">
                <img style={thumbnailStyles} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {`${description.slice(0, 210)}`}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {(comics.length > 0) ? null : 'There is no comics with this hero.'}
                {comicsData}
            </ul>
        </>
    );
}

export default CharInfo;