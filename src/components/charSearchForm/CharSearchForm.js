import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';

import ErrorMessage from '../errorMessage/errorMessage';
import './charSearchForm.scss';

const CharSeacrhForm = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const updateChar = (input) => {
        clearError();
        getCharacterByName(input)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <Formik
            initialValues={{'charName': ''}}
            validationSchema = {Yup.object({
                charName: Yup.string().required('This field is required')
            })}
            onSubmit={values => updateChar(values.charName)}>
            {
                ({touched, values}) => (
                    <div className="char__search-form">
                        <Form>
                            <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                            <div className="char__search-wrapper">
                                <Field 
                                    id="charName" 
                                    name='charName' 
                                    type='text' 
                                    placeholder="Enter name"/>
                                <button
                                    disabled={loading} 
                                    type='submit' 
                                    className="button button__main">
                                    <div className="inner">find</div>
                                </button>
                            </div>
                            <FormikErrorMessage component="div" className="char__search-error" name="charName"/>

                            {error ? <ErrorMessage/> : null}
                            
                            {char ? char.name ? 
                             <View char={char}/> :
                             <div className="char__search-error">
                                The character was not found. Check the name and try again.
                            </div> : null}
                        </Form>
                    </div>
                )
            }
        </Formik>
    );
}

const View = ({char}) => {
    return (
        <div className='char__search-wrapper'>
            <div className="char__search-success">There is! Visit {char.name} page?</div>
            <Link to={`/characters/${char.id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div>
    );
}

export default CharSeacrhForm;