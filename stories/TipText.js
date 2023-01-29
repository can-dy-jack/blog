import React from 'react';
import PropTypes from 'prop-types';

function TipText({
  children, text, color, bg,
}) {
  return (
    <span>
      <span style={{
        color,
        backgroundColor: bg,
        padding: '2px 15px',
        marginRight: '10px',
        borderRadius: '15px',
        fontSize: '0.9em',
      }}
      >
        { text }
      </span>
      { children }
    </span>
  );
}
TipText.propTypes = {
  /**
     * 提示文本
     */
  text: PropTypes.string,
  /**
     * 提示文本颜色
     */
  color: PropTypes.string,
  /**
     * 提示文本背景颜色
     */
  bg: PropTypes.string,
};
TipText.defaultProps = {
  text: 'Tip',
  color: '#2de042',
  bg: '#2de04224',
};

export default TipText;