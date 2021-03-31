/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
import React, { useState } from 'react';
import axios from 'axios';
import Places from './Places';
import Form from './Form';
import Wheel from './Wheel';
import Desktop from './responsive/desktop';
import Mobile from './responsive/mobile';

function App() {
  const [location, setLocation] = useState('');
  const [term, setTerm] = useState('');
  const [stores, setStores] = useState([]);
  const [openPlaces, setPlaces] = useState(false);
  const [pickList, setPick] = useState([]);
  const [error, setError] = useState(false);

  function clickPlaces() {
    setPlaces(!openPlaces);
    setStores([]);
  }

  function submitInfo(e) {
    e.preventDefault();
    clickPlaces();
    axios.get(`/search?location=${location}&term=${term}&open_now=true&categories=store,food`)
      .then((results) => {
        if (results.data.businesses.length === 0) {
          setPlaces(false);
          setError(true);
        } else {
          setError(false);
          setStores(results.data.businesses);
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <div id="header">
        <h1>PickEAT!</h1>
        <h5>I'll pick a place for you!</h5>
      </div>
      <Desktop>
        <Form
          setLocation={setLocation}
          setTerm={setTerm}
          term={term}
          submitInfo={submitInfo}
          error={error}
          setError={setError}
        />
        <Places
          stores={stores}
          openPlaces={openPlaces}
          clickPlaces={clickPlaces}
          setPick={setPick}
          pickList={pickList}
          setStores={setStores}
        />
        <Wheel pickList={pickList} setPick={setPick} />
      </Desktop>
    </div>
  );
}

export default App;
