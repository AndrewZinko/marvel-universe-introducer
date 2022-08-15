import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/spinner";

const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const Page404 = lazy(() => import("../pages/404"));
const SinglePage = lazy(() => import("../pages/SinglePage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SingleCharacterPage = lazy(() => import('../pages/SingleCharacterPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/> 
                            <Route path="*" element={<Page404/>}/>
                            <Route path="/comics/:id" element={<SinglePage BaseComponent={SingleComicPage} type="comic"/>}/>
                            <Route path="/characters/:id" element={<SinglePage BaseComponent={SingleCharacterPage} type="char"/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;