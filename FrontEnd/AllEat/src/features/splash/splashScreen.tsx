import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Splash6 from '../../assets/images/splash6.svg';
import Splash7 from '../../assets/images/splash7.svg';
import Splash8 from '../../assets/images/splash8.svg';
import Splash9 from '../../assets/images/splash9.svg';
import Splash10 from '../../assets/images/splash10.svg';
import Splash11 from '../../assets/images/splash11.svg';
import Splash12 from '../../assets/images/splash12.svg';
import Splash13 from '../../assets/images/splash13.svg';
import Splash14 from '../../assets/images/splash14.svg';
import Splash15 from '../../assets/images/splash15.svg';
import Splash16 from '../../assets/images/splash16.svg';

const SplashScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Splash6부터 시작

  // 화면 크기를 가져오기 위한 Dimensions 사용
  const { width, height } = Dimensions.get('window');

  // 교체할 이미지 목록 (SVG 컴포넌트 6~16)
  const imageList = [
    <Splash6 width={width} height={height} />, 
    <Splash7 width={width} height={height} />,
    <Splash8 width={width} height={height} />,
    <Splash9 width={width} height={height} />,
    <Splash10 width={width} height={height} />,
    <Splash11 width={width} height={height} />,
    <Splash12 width={width} height={height} />,
    <Splash13 width={width} height={height} />,
    <Splash14 width={width} height={height} />,
    <Splash15 width={width} height={height} />,
    <Splash16 width={width} height={height} />,
  ];

  // 이미지 교체 및 1.6초 동안 이미지 순차적으로 교체
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < imageList.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 50); // 각 이미지가 70ms 동안 표시됨

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageList[currentImageIndex]}
    </View>
  );
};

export default SplashScreen;
