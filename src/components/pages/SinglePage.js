import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const SinglePage = ({BaseComponent, type}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData(id);
    }, [id]);

    const updateData = (id) => {
        clearError();
        if (!id) return;
        
        switch(type) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'char':
                getCharacter(id).then(onDataLoaded);
                break;
            default:
                throw new Error(`There's no such type of ID to fetch this request`);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? data : null;

    return (
        <>
            <Helmet>
                <meta name="description" content={content?.description}/>
                <title>{content?.title}</title>
            </Helmet>
            <BaseComponent errorMessage={errorMessage} spinner={spinner} content={content}/>
        </>
    );
}

export default SinglePage;