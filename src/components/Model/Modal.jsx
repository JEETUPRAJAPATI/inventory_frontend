import React from 'react';
import '../../components/Model/Modal.scss';
import { Box } from '@mui/material';

const customStyles = {
  height: 'auto',
  bottom: 'auto',
  top: '20%',
};

const Modal = ({ isOpen, title, closeModal, children, footer }) => {
  const closeModalHandler = () => {
    closeModal?.();
  };

  if (!isOpen) return null;

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <div className="modal" style={customStyles}>
        <div className="modal__header">
          <div className="modal__title">
            <p>{title}</p>
          </div>
        </div>
        <div className="modal__content">{children}</div>
        <div className="modal__footer">{footer}</div>
      </div>
    </Box>
  );
};

export default Modal;
