import { Link } from 'react-router-dom';
import AppBanner from '../appBanner/AppBanner';

import './SingleComicPage.scss';

const SingleComicPage = ({errorMessage, spinner, content}) => {
    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content ? 
            <div className="single-comic">
                <img style={{'height': 'auto'}} src={content.thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{content.name}</h2>
                    <p className="single-comic__descr">{content.description}</p>
                </div>
                <Link to="/" className="single-comic__back">
                    <button className="button button__main">
                        <div className="inner">
                            Back to main page
                        </div>
                    </button>
                </Link>
            </div> : null}
        </>
    )
}

export default SingleComicPage;