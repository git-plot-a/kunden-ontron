"use client"

import { useEffect, useRef, useState } from 'react';
// import { useEffect, useState } from 'react';
// import lottie from 'lottie-web';
// import Lottie from 'lottie-react';
import animation from "./Robo_email.json"
import Image from 'next/image';

const LottieAnimation = () => {
    const lottieContainer = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Устанавливаем, что компонент отрендерился на клиенте
        setIsClient(true);
    }, []);

    // useEffect(() => {
    //     console.log(animation)
    //     // Запускаем анимацию только на клиенте
    //     if (isClient && lottieContainer.current) {
    //         lottie.loadAnimation({
    //             container: lottieContainer.current, // указание контейнера через useRef
    //             animationData: animation, // путь к JSON
    //             renderer: 'svg',
    //             loop: true,
    //             autoplay: true,
    //         });
    //     }
    // }, [isClient]); // Данный хук сработает только на клиенте

    if (!isClient) {
        // Пока компонент рендерится на сервере, возвращаем null или пустой div
        return null;
    }

    return <div style={{ paddingTop: 100 }}>
     
        {JSON.stringify(animation)}
        <Image width={500} height={300} src="/animation/Robo_email_v001.gif" alt="ttt" />
        <div ref={lottieContainer} style={{ width: 300, height: 300 }}></div>
    </div>;
};

export default LottieAnimation;
