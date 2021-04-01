/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {
  Button, TextField, Select, MenuItem,
} from '@material-ui/core';
import Suggestions from './Suggestions';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontFamily: 'Playfair Display, serif',
  },
  btn: {
    margin: theme.spacing(1),
    fontWeight: 'bold',
    fontFamily: 'Playfair Display, serif',
  },
  text: {
    fontFamily: 'Playfair Display, serif',
  },
}));

const Form = ({
  setLocation, setTerm, term, submitInfo, error, setError,
}) => {
  const classes = useStyles();
  const [cities, setCities] = useState([]);
  const [openModal, setModal] = useState(false);

  useEffect(() => {
    axios.get('/cities')
      .then((results) => setCities(results.data))
      .catch((err) => console.error(err));
  }, []);

  function clickModal() {
    setModal(!openModal);
  }

  return (
    <form onSubmit={submitInfo}>
      <div className="formFields" style={{ width: '15%' }}>
        <Select defaultValue="location" onChange={(e) => setLocation(e.target.value)} fullWidth>
          <MenuItem value="location">
            {' '}
            <em> Select a location... </em>
            {' '}
          </MenuItem>
          {cities.map((item, index) => (
            <MenuItem value={item} key={index} className={classes.text}>{item}</MenuItem>
          ))}
        </Select>
      </div>
      <div className="formFields">
        <TextField label={error ? 'Error' : 'Input a category'} name="term" onChange={(e) => { setTerm(e.currentTarget.value); setError(false); }} value={term} error={error} helperText={error ? 'No results found.' : null} fullWidth variant="filled" />
      </div>
      <div className="formFields">
        <Button type="button" onClick={clickModal} variant="contained" size="large" className={classes.btn}>Suggestions</Button>
        <Suggestions clickModal={clickModal} open={openModal} setTerm={setTerm} />
      </div>
      <div className="formFields">
        <Button type="submit" variant="contained" size="large" className={classes.button} endIcon={<SearchIcon />}>
          Search
        </Button>
      </div>
    </form>
  );
};

Form.propTypes = {
  setLocation: PropTypes.func,
  setTerm: PropTypes.func,
  term: PropTypes.string,
  submitInfo: PropTypes.func,
  error: PropTypes.bool,
  setError: PropTypes.func,
};

Form.defaultProps = {
  setLocation: null,
  setTerm: null,
  term: '',
  submitInfo: null,
  error: false,
  setError: null,
};

export default Form;
