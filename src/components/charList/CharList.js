import React, { useState, useEffect, useRef } from 'react';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [content, setContent] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const refs = useRef([]);

    const {loading, error, getAllCharacters} = useMarvelService();

    const onCharListLoaded = (charList) => {
        let ended = false;
        if (charList.length < 9) {
            ended = true;
        }
        setContent(content => ([...content, ...charList]));
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {!(errorMessage || spinner) ? 
            <CharListData 
                data={content} 
                refsToItem={refs}
                onCharSelected={props.onCharSelected}
                newItemLoading={newItemLoading}
                onRequest={() => onRequest(offset)}
                charEnded={charEnded}/> : null}
        </>
    );
}

const CharListData = ({data, refsToItem, onCharSelected, newItemLoading, onRequest, charEnded}) => {
    let itemThumbnail = null,
        itemThumbnailStyle = null;

    const contentToLoad = data.map((item, index) => {
        itemThumbnail = item.thumbnail.indexOf('image_not_available') > -1;
        itemThumbnailStyle = itemThumbnail ? {objectFit: 'unset'} : null;
        return (
            <li 
                ref={elem => refsToItem.current[index] = elem}
                className="char__item" 
                key={item.id}
                tabIndex={0}
                onClick={() => onCharSelected(item.id, refsToItem, refsToItem.current[index])}>
                <img style={itemThumbnailStyle} src={item.thumbnail} alt="Hero thumbnail"/>
                <div className="char__name">{item.name}</div>
            </li>
        );
    });

    return (
        <div className="char__list">
            <ul className="char__grid">
                {contentToLoad}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={onRequest}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

export default CharList;