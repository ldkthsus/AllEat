import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Splash1 from '../../assets/images/splash1.svg';
import Splash2 from '../../assets/images/splash2.svg';
import Splash3 from '../../assets/images/splash3.svg';
import Splash4 from '../../assets/images/splash4.svg';
import Splash5 from '../../assets/images/splash5.svg';
import Splash6 from '../../assets/images/splash6.svg';
import Splash7 from '../../assets/images/splash7.svg';
import Splash8 from '../../assets/images/splash8.svg';

const SplashScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 화면 크기를 가져오기 위한 Dimensions 사용
  const { width, height } = Dimensions.get('window');

  // 교체할 이미지 목록 (SVG 컴포넌트)
  const imageList = [
    <Splash1 width={width} height={height} />, 
    <Splash2 width={width} height={height} />,
    <Splash3 width={width} height={height} />,
    <Splash4 width={width} height={height} />,
    <Splash5 width={width} height={height} />,
    <Splash6 width={width} height={height} />,
    <Splash7 width={width} height={height} />,
    <Splash8 width={width} height={height} />,
  ];

  // 이미지 교체 및 1.6초 동안 이미지 순차적으로 교체
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < imageList.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 1);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageList[currentImageIndex]}
    </View>
  );
};

export default SplashScreen;
