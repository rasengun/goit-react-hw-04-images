import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import '../../styles.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, close }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  });

  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  return createPortal(
    <div className="overlay" onClick={closeModal}>
      <div className="modal">{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

/*
class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { children } = this.props;
    const { closeModal } = this;

    return createPortal(
      <div className="overlay" onClick={closeModal}>
        <div className="modal">{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
*/

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired,
};
