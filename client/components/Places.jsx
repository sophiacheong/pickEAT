/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress, ListItem, ListItemText, List, Button,
} from '@material-ui/core';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    background: 'gray',
    color: 'whitesmoke',
    fontSize: 'medium',
  },
});

function Places({
  stores, openPlaces, clickPlaces, setPick, pickList, setStores
}) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);

  function selectItem(e, ind) {
    const currInd = selected.indexOf(ind);
    if (currInd === -1) {
      const newList = selected.concat([ind]);
      setSelected(newList);
    } else {
      const prev = selected.slice(0, currInd);
      const next = selected.slice(currInd + 1, selected.length);
      setSelected(prev.concat(next));
    }
  }

  function submitPlaces() {
    const newArr = pickList;
    for (let i = 0; i < selected.length; i++) {
      newArr.push(stores[i]);
    }
    setPick(newArr);
    setSelected([]);
    setStores([]);
    clickPlaces();
  }

  return (
    <div>
      <Modal appElement={document.getElementById('app')} style={customStyles} isOpen={openPlaces} onRequestClose={clickPlaces}>
        <div>
          { stores.length > 0
            ? (
              <div id="mainPlaces">
                <List id="placesModal">
                  <div className="placesList">
                    {stores.map((item, index) => (
                      index < 10 ? (
                        <ListItem value={item.name} key={item.id} button onClick={(e) => selectItem(e, index)} selected={selected.includes(index)}>
                          <ListItemText primary={item.name} />
                        </ListItem>
                      ) : null
                    ))}
                  </div>
                  <div className="placesList2">
                    {stores.map((item, index) => (
                      index >= 10 ? <ListItem value={item.name} key={item.id} button onClick={(e) => selectItem(e, index)} selected={selected.includes(index)}><ListItemText primary={item.name} /></ListItem> : null
                    ))}
                  </div>
                </List>
                <Button className={classes.root} onClick={submitPlaces}> Submit </Button>
              </div>
            ) : <CircularProgress size="2rem" /> }
        </div>
      </Modal>
    </div>
  );
}

Places.propTypes = {
  stores: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  openPlaces: PropTypes.bool,
  clickPlaces: PropTypes.func,
  setPick: PropTypes.func,
  pickList: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.any,
    ]),
  ),
  setStores: PropTypes.func,
};

Places.defaultProps = {
  stores: [],
  openPlaces: false,
  clickPlaces: null,
  setPick: null,
  pickList: [],
  setStores: null,
};

export default Places;
