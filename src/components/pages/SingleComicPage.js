import { Link } from 'react-router-dom';

import './SingleComicPage.scss';

const SingleComicPage = ({errorMessage, spinner, content}) => {
    return (
        <>
            {errorMessage}
            {spinner}
            {content ? 
            <div className="single-comic">
                <img src={content.thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{content.title}</h2>
                    <p className="single-comic__descr">{content.description}</p>
                    <p className="single-comic__descr">{content.pageCount} pages</p>
                    <p className="single-comic__descr">Language: {content.language}</p>
                    <div className="single-comic__price">{content.price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">
                    <button className="button button__main">
                        <div className="inner">
                            Back to all
                        </div>
                    </button>
                </Link>
            </div> : null}
        </>
    )
}

export default SingleComicPage;