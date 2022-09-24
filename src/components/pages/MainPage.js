import { useState } from "react";
import { Helmet } from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import CharSeacrhForm from "../charSearchForm/CharSearchForm";

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const removeSelectFromOtherChar = (refs) => {
        refs.current.forEach(item => {
            if (item.classList.contains('char__item_selected')) 
                item.classList.remove('char__item_selected');
        });
    }

    const onCharSelected = (id, refs, ref) => {
        removeSelectFromOtherChar(refs);
        ref.classList.add('char__item_selected');
        setChar(id);
    }

    return (
        <>
            <Helmet>
                <meta name="description" content="Marvel Universe Introducer"/>
                <title>Marvel Universe Introducer</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                    <div>   
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharSeacrhForm/>
                        </ErrorBoundary>
                    </div>
            </div>
        </>
    );
}

export default MainPage;