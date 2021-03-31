import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

function Suggestions({ open, clickModal, setTerm }) {
  function inputTerm(e) {
    setTerm(e.currentTarget.value);
    clickModal();
  }
  return (
    <Modal appElement={document.getElementById('app')} isOpen={open} onRequestClose={clickModal} style={customStyles}>
      <div className="modal_buttons">
        <Button value="Coffee" onClick={inputTerm}> Coffee </Button>
        <Button value="Pizza" onClick={inputTerm}> Pizza </Button>
        <Button value="Japanese" onClick={inputTerm}> Japanese </Button>
        <Button value="Churros" onClick={inputTerm}> Churros </Button>
      </div>
      <div className="modal_buttons">
        <Button value="Mediterranean" onClick={inputTerm}> Mediterranean </Button>
        <Button value="Fast Food" onClick={inputTerm}> Fast Food </Button>
        <Button value="Mexican" onClick={inputTerm}> Mexican </Button>
        <Button value="Korean" onClick={inputTerm}> Korean </Button>
      </div>
      <div className="modal_buttons">
        <Button value="Vietnamese" onClick={inputTerm}> Vietnamese </Button>
        <Button value="Chinese" onClick={inputTerm}> Chinese </Button>
        <Button value="Ice Cream" onClick={inputTerm}> Ice Cream </Button>
        <Button value="American" onClick={inputTerm}> American </Button>
      </div>
    </Modal>
  );
}

Suggestions.propTypes = {
  open: PropTypes.bool,
  clickModal: PropTypes.func,
  setTerm: PropTypes.func,
};

Suggestions.defaultProps = {
  open: false,
  clickModal: null,
  setTerm: null,
};

export default Suggestions;
