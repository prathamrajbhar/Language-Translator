import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
function App() {
  const [userQuery, setuserQuery] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('');

  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');

  const translate = () => {
    const encodeParams = new URLSearchParams();
    encodeParams.set('q', userQuery);
    encodeParams.set('source', sourceLanguage);
    encodeParams.set('target', targetLanguage);

    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '89a70ee230msh5cd3e527f447396p19d58cjsnab0cbda29d4e',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: encodeParams
    };

    axios.request(options)
      .then(response => {
        // console.log(response.data);
        setTranslatedText(response.data.data.translations[0].translatedText);
      })
      .catch(error => {
        console.error(error);
      });
  };


  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
      headers: {
        'X-RapidAPI-Key': '89a70ee230msh5cd3e527f447396p19d58cjsnab0cbda29d4e',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(response => {
        console.log(response.data);
        setLanguage(response.data.data.languages);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);



  return (
    <div className='newContainer'>
      <h1 className='newTitle'>Language Translator</h1>
      <div className='newFormGroup flexLanguageBox'>
        <div className='newRow'>
          <label>Source Language</label>
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className='formControl newInputBox'
          >
            <option value="Select Language">Select Language</option>
            {language && language.map((lang) => (
              <option key={lang.language} value={lang.language}>
                {lang.language}
              </option>
            ))}
          </select>
        </div>
        <div className='newRow'>
          <label>Target Language</label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className='formControl newInputBox'
          >
            <option value="Select Language">Select Language</option>
            {language && language.map((lang) => (
              <option key={lang.language} value={lang.language}>
                {lang.language}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='newFormGroup flexArea'>
        <textarea
          className='formControl newAreaBox'
          value={userQuery}
          placeholder='Enter text to translate'
          onChange={(e) => setuserQuery(e.target.value)}
        />
        <textarea
          className='formControl newAreaBox'
          value={translatedText}
          placeholder='Translated text'
          onChange={(e) => setTranslatedText(e.target.value)}
        />
      </div>
      <div className='newFormGroup text-center'>
        <button onClick={translate} className='newTranslateBtn'>
          Translate
        </button>
      </div>
    </div>

  );
}

export default App;
