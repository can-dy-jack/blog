import { useEffect, useState } from "react";

function useIsMobile() {
    const [isMobile, set] = useState(false)

    useEffect(() => {
        //初始化
        set(window.innerWidth <= 800 ? true : false)
        // 监控窗口变化
        window.addEventListener('resize', () => {
            set(window.innerWidth <= 800 ? true : false)
        })
    }, [])

    return isMobile;
}

export default useIsMobile;