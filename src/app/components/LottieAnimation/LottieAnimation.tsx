"use client"

import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

type Props = {
    animation: object,
    styles?: object
}

const LottieAnimation: React.FC<Props> = ({ animation, styles = {} }) => {
    const lottieContainer = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && lottieContainer.current) {
            lottie.loadAnimation({
                container: lottieContainer.current,
                animationData: animation,
                loop: true,
                autoplay: true,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid meet', // Настройка пропорций
                },
            });
        }
    }, [isClient]);

    if (!isClient) {
        return null;
    }

    return <div>
        <div ref={lottieContainer} style={styles}></div>
    </div>;
};

export default LottieAnimation;
