/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress, ListItem, ListItemText, List, Button, Link
} from '@material-ui/core';
import { Rating, Pagination } from '@material-ui/lab';

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
  page: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1em',
  },
  listItem: {
    display: 'table-row',
  },
  text: {
    fontFamily: 'Playfair Display, serif',
  },
});

function Places({
  stores, openPlaces, clickPlaces, setPick, pickList, setStores,
}) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [currentPg, setPage] = useState(1);

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

  function changePages(e, value) {
    setPage(value);
  }

  function submitPlaces() {
    const newArr = pickList;
    for (let i = 0; i < selected.length; i++) {
      newArr.push(stores[currentPg - 1][i]);
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
                  <div id="listModal">
                    {stores[currentPg - 1].map((item, index) => (
                      index < 10 ? (
                        <ListItem className={classes.listItem} value={item.name} key={item.id} button onClick={(e) => selectItem(e, item.id)} selected={selected.includes(item.id)}>
                          <div className="placesList">
                            <div className="rightList"><ListItemText className={classes.text} primary={item.name} /></div>
                            <div className="rightList">{item.location.display_address}</div>
                          </div>
                          <div className="placesList">
                            <div className="leftList"><Rating value={item.rating} readOnly size="small" /></div>
                            <div className="leftList">
                              <Link href={item.url} target="_blank">YELP PAGE</Link>
                            </div>
                          </div>
                        </ListItem>
                      ) : null
                    ))}
                  </div>
                </List>
                <Button className={classes.root} onClick={submitPlaces}> Submit </Button>
                <Pagination count={stores.length} variant="outlined" className={classes.page} page={currentPg} onChange={changePages} />
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
