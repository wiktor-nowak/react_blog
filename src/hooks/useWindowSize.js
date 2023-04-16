import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);

    }, [])

    return windowSize;
}

export default useWindowSize;

// TODO - Czy listener na window zapobiega w tym przypadku reloadowi całej apki?? Czemu nie można byłoby ogarnąć tego w tablicy zmiennych, na które wpływa? [...]
