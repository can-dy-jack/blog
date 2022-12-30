import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from "./ToolTip.module.css";

function ToolTip({ children, type, text }) {
    const tooltip_event = useRef();
    const tooltip = useRef();
    const tootip_box = useRef();
    const tooltip_pointer = useRef();

    useEffect(() => {
        tooltip_event.current.addEventListener("mouseover", () => {
            tooltip.current.style.opacity = "1"
            tooltip_pointer.current.style.opacity = "1"
        })
        tooltip_event.current.addEventListener("mouseout", () => {
            tooltip.current.style.opacity = "0"
            tooltip_pointer.current.style.opacity = "0"
        })
    }, [])

    useEffect(() => {
        tootip_box.current.style.setProperty("--tooltip-bottom-b", 
            -tooltip.current.offsetHeight + 'px'
        )
        tootip_box.current.style.setProperty("--tooltip-bottom-l", 
            (tooltip_event.current.offsetWidth/2 - tooltip.current.offsetWidth/2) + 'px'
        )
        tootip_box.current.style.setProperty("--w2", 
            tooltip_event.current.offsetWidth/2 + 'px'
        )
        tootip_box.current.style.setProperty("--h2", 
            tooltip_event.current.offsetHeight/2 + 'px'
        )
        tootip_box.current.style.setProperty("--tooltip-left-t", 
            (tooltip_event.current.offsetHeight/2 - tooltip.current.offsetHeight/2) + 'px'
        )
        tootip_box.current.style.setProperty("--tooltip-left-l", 
            -tooltip.current.offsetWidth + 'px'
        )
    }, [tooltip, tooltip_event, tootip_box])

    return (
        <span className={styles.tooltip_box} ref={tootip_box}>
            <span ref={tooltip_event} className={styles.tooltip_event}>
                { children }
            </span>
            <span className={
                type === "bottom" ? styles.tooltip_bottom : (
                    type==="top" ? styles.tooltip_top : (
                       type==="left" ? styles.tooltip_left :  styles.tooltip_right
                    )
                )
            } ref={tooltip}>
                { text }
            </span>
            <span className={
                type === "bottom" ? styles.tooltip_pointer_bottom : (
                    type === "top" ? styles.tooltip_pointer_top : (
                        type === "left" ? styles.tooltip_pointer_left : styles.tooltip_pointer_right
                    )
                )
            } ref={tooltip_pointer}></span>
        </span>
    )
}

ToolTip.propTypes = {
    /**
     * tooltip 类型，left | top | right | bottom
     */
    type: PropTypes.oneOf(['left', 'bottom', 'right', 'top']),
    /**
     * tooltip 文本
     */
    text: PropTypes.string
}
ToolTip.defaultProps = {
    type: "bottom",
    text: "ToolTip"
}

export default ToolTip;