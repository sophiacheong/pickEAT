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
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    'justify-content': 'center',
    display: 'flex',
    'align-items': 'baseline',
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
    <form onSubmit={submitInfo} className={classes.root}>
      <Select defaultValue="location" onChange={(e) => setLocation(e.target.value)} style={{ width: '16%' }}>
        <MenuItem value="location">
          {' '}
          <em> Select a location... </em>
          {' '}
        </MenuItem>
        {cities.map((item, index) => (
          <MenuItem value={item} key={index}>{item}</MenuItem>
        ))}
      </Select>
      <TextField label={error ? 'Error' : 'Input a category'} name="term" onChange={(e) => { setTerm(e.currentTarget.value); setError(false); }} value={term} error={error} helperText={error ? 'No results found.' : null} />
      <Button type="button" onClick={clickModal} variant="outlined" size="small">Suggestions</Button>
      <Suggestions clickModal={clickModal} open={openModal} setTerm={setTerm} />
      <Button type="submit" variant="contained" size="small" className={classes.button} endIcon={<SearchIcon />}>
        Search
      </Button>
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
