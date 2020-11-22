import * as React from 'react';

export const useWindowSize = () => {
    const [size, setSize] = React.useState<any>();
    React.useEffect(() => {
        const handleSize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleSize);
        handleSize();
        return () => {
            window.removeEventListener('resize', handleSize);
        };
    }, []);

    return size;
};
