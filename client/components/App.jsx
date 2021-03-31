/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import MobileForm from './MobileForm';
import Places from './Places';
import Form from './Form';
import Wheel from './Wheel';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 980 });
  return isMobile ? children : null;
};

const customStyles = {
  content: {
    top: 'auto',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, 0%)',
    border: '1.5px solid rgba(150, 40, 27, 1)',
    borderRadius: '0px',
  },
};

function App() {
  const [location, setLocation] = useState('');
  const [term, setTerm] = useState('');
  const [stores, setStores] = useState([]);
  const [openPlaces, setPlaces] = useState(false);
  const [pickList, setPick] = useState([]);
  const [error, setError] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [entry, setEntry] = useState('');

  function clickPlaces() {
    setPlaces(!openPlaces);
    setStores([]);
  }

  function arrangePages(arr) {
    const chunk = [];
    for (let i = 0; i < arr.length; i += 5) {
      const myChunk = arr.slice(i, i + 5);
      chunk.push(myChunk);
    }
    setStores(chunk);
  }

  function submitInfo(e) {
    e.preventDefault();
    if (term.length === 0 && (location.length === 0 || location === 'location')) {
      setInvalid(true);
      setEntry('Invalid entries');
    } else if (location.length === 0 || location === 'location') {
      setInvalid(true);
      setEntry('Please select a location');
    } else if (term.length === 0) {
      setInvalid(true);
      setEntry('Please insert a category');
    } else {
      clickPlaces();
      setInvalid(false);
      setEntry('');
      axios.get(`/search?location=${location}&term=${term}&open_now=true&categories=store,food`)
        .then((results) => {
          if (results.data.businesses.length === 0) {
            setPlaces(false);
            setError(true);
          } else {
            setError(false);
            arrangePages(results.data.businesses);
          }
        })
        .catch((err) => console.error(err));
    }
  }

  console.log(stores);

  return (
    <div>
      <div id="header">
        <h1>PickEAT</h1>
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
        {invalid ? (
          <Modal appElement={document.getElementById('app')} style={customStyles} isOpen={invalid} onRequestClose={() => setInvalid(!invalid)}>
            <div id="error">Error!</div>
            <div className="err">{entry}</div>
          </Modal>
        ) : null}
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
      <Mobile>
        <div id="mobileForm">
          <MobileForm
            setLocation={setLocation}
            setTerm={setTerm}
            term={term}
            submitInfo={submitInfo}
            error={error}
            setError={setError}
          />
          {invalid ? (
            <Modal appElement={document.getElementById('app')} style={customStyles} isOpen={invalid} onRequestClose={() => setInvalid(!invalid)}>
              <div id="error">Error!</div>
              <div className="err">{entry}</div>
            </Modal>
          ) : null}
          <Places
            stores={stores}
            openPlaces={openPlaces}
            clickPlaces={clickPlaces}
            setPick={setPick}
            pickList={pickList}
            setStores={setStores}
          />
          <Wheel pickList={pickList} setPick={setPick} />
        </div>
      </Mobile>
    </div>
  );
}

export default App;
