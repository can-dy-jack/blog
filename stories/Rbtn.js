import React from 'react';
import PropTypes from 'prop-types';
import style from './Rbtn.module.css';

function Rbtn({
  children, dark, disabled, onClick,
}) {
  return (
    <button
      type="button"
      className={
            [style.rbtn, dark ? style.dark_rbtn : ''].join(' ')
        }
      disabled={disabled}
      onClick={onClick}
    >
      { children }
    </button>
  );
}
Rbtn.propTypes = {
  dark: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
Rbtn.defaultProps = {
  dark: false,
  disabled: false,
  onClick: () => {},
};

export default Rbtn;