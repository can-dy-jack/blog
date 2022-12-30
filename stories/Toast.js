import React from 'react';
import PropTypes from 'prop-types';
import styles from "./Toast.module.css"

function Toast({ text, type }) {
    const colors = new Map();
    colors.set('info', '#1212ef').set('success', '#2e823e')
        .set('loading', '#1ea7fd').set('warning', '#ffd04c')
        .set("danger", "#ff4340")

    const svg = () => {
        if(type === 'info') {
            return (
            <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M12 11.5v5M12 7.51l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#1212ef" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            )
        } else if(type === 'success') {
            return (
                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                    <path d="M7 12.5l3 3 7-7" stroke="#2e823e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#2e823e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            )
        } else if(type === 'loading') {
            return (
                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                    <path d="M15 7a2 2 0 100-4 2 2 0 000 4zM12.613 8.267l-3.308 4.135 4.135 4.135-2.067 4.55" stroke="#1ea7fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.41 9.508l3.387-3.309 2.816 2.068 2.895 3.308h3.722M8.892 15.71l-1.241.827H4.343" stroke="#1ea7fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            )
        } else if(type === 'warning') {
            return (
                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                    <path d="M20.043 21H3.957c-1.538 0-2.5-1.664-1.734-2.997l8.043-13.988c.77-1.337 2.699-1.337 3.468 0l8.043 13.988C22.543 19.336 21.58 21 20.043 21zM12 9v4" stroke="#ffd04c" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path d="M12 17.01l.01-.011" stroke="#ffd04c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            )
        } else if(type === 'danger') {
            return (
                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                    <path d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#ff4340" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            )
        }
    }

    return (
        <span className={styles.toast} style={{
            "--toast-color": colors.get(type)
        }}>
            { svg() }
            <span>{ text }</span>
        </span>
    )
}

Toast.propTypes = {
    /**
     * Toast 文本内容
     */
    text: PropTypes.string,
    /**
     * Toast 类型
     */
    type: PropTypes.oneOf(['info', 'success', 'loading', 'warning', 'danger'])
}
Toast.defaultProps = {
    text: "This is a info message.",
    type: "info"
}

export default Toast;