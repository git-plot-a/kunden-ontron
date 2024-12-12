"use client"

import React, { useEffect, useRef, useState } from 'react';
// import { useEffect, useState } from 'react';
import lottie from 'lottie-web';
// import Lottie from 'lottie-react';
// import animation from "./Robo_email_v002.json"
// import Image from 'next/image';

type Props = {
    animation: object
}

const LottieAnimation: React.FC<Props> = ({animation}) => {
    const lottieContainer = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Устанавливаем, что компонент отрендерился на клиенте
        setIsClient(true);
    }, []);

    useEffect(() => {
        // console.log(animation)
        // Запускаем анимацию только на клиенте
        if (isClient && lottieContainer.current) {
            lottie.loadAnimation({
                container: lottieContainer.current, // указание контейнера через useRef
                animationData: animation, // путь к JSON
                loop: true,
                autoplay: true,
            });
        }
    }, [isClient]); 

    if (!isClient) {
        return null;
    }

    return <div style={{ paddingTop: 100 }}>
     
        {/* {JSON.stringify(animation)} */}
        {/* <Image width={500} height={300} src="/animation/Robo_email_v001.gif" alt="ttt" /> */}
        <div ref={lottieContainer}></div>
    </div>;
};

export default LottieAnimation;
