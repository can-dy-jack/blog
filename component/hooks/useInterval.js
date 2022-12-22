import { useRef, useEffect } from "react"

function useInterval(func, delay) {
    const saveCallback = useRef(func);

    useEffect(() => {
        saveCallback.current = func;
    }, [func])

    useEffect(() => {
        const cb = () => saveCallback.current();
        if(delay !== null) {
            const id = setInterval(cb, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default useInterval;