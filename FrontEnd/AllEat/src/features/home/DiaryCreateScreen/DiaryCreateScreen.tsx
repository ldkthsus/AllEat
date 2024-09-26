import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Modal} from 'react-native';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {icons} from '../../../constants';
import {styles} from './DiaryCreateScreen.styles';
import CustomButton from '../../../components/CustomButton';
import DiaryCard from '../components/DiaryCard/DiaryCard';
import MenuCard from '../components/MenuCard/MenuCard';
type DiaryCreateScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DiaryCreate'
>;
type DiaryCreateRouteProp = RouteProp<RootStackParamList, 'DiaryCreate'>;

const DiaryCreateScreen: React.FC = () => {
  const navigation = useNavigation<DiaryCreateScreenNavigationProp>();
  const route = useRoute<DiaryCreateRouteProp>();
  const {date, meals} = route.params; // 이제 date와 meals가 제대로 타입을 인식함
  const [isModalVisible, setModalVisible] = useState(false); // 모달 상태

  // 모달 열기 및 닫기
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const [mealList, setMealList] = useState([
    {restaurant: '집밥', menu: '삶은계란', price: 0, kcal: 78, people: 1},
  ]);
  const [restaurantIndex, setRestaurantIndex] = useState(0);

  const [restaurants, setRestaurants] = useState([
    {
      name: '투썸플레이스',
      menus: [
        {menu: '아이스아메리카노', price: 4500, kcal: 5, isFavorate: false},
      ],
    },
    {
      name: '아리소바제면소',
      menus: [{menu: '고사리소바', price: 8900, kcal: 300, isFavorate: false}],
    },
  ]);
  // 인원 증가 함수
  const increasePeople = (index: number) => {
    setMealList(prevMealList =>
      prevMealList.map((meal, i) =>
        i === index ? {...meal, people: meal.people + 1} : meal,
      ),
    );
  };

  // 인원 감소 함수
  const decreasePeople = (index: number) => {
    setMealList(prevMealList =>
      prevMealList.map((meal, i) =>
        i === index && meal.people > 1
          ? {...meal, people: meal.people - 1}
          : meal,
      ),
    );
  };

  // 메뉴 삭제 함수
  const deleteMeal = (index: number) => {
    setMealList(prevMealList => prevMealList.filter((_, i) => i !== index));
  };
  // 식당 순회: 이전
  const goToPreviousRestaurant = () => {
    setRestaurantIndex(prevIndex =>
      prevIndex === 0 ? restaurants.length - 1 : prevIndex - 1,
    );
  };

  // 식당 순회: 다음
  const goToNextRestaurant = () => {
    setRestaurantIndex(prevIndex =>
      prevIndex === restaurants.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // 즐겨찾기 토글
  const toggleFavorite = (menuIdx: number) => {
    const updatedRestaurants = [...restaurants];
    updatedRestaurants[restaurantIndex].menus[menuIdx].isFavorate =
      !updatedRestaurants[restaurantIndex].menus[menuIdx].isFavorate;
    setRestaurantIndex(restaurantIndex); // 트리거 상태 업데이트
    setRestaurants(updatedRestaurants);
  };

  // 메뉴 추가 함수
  const addMeal = (menuIdx: number) => {
    const selectedMenu = restaurants[restaurantIndex].menus[menuIdx];
    setMealList(prevMealList => [
      ...prevMealList,
      {
        restaurant: restaurants[restaurantIndex].name,
        menu: selectedMenu.menu,
        price: selectedMenu.price,
        kcal: selectedMenu.kcal,
        people: 1, // 초기 인원 1로 설정
      },
    ]);
  };

  return (
    <View style={styles.diaryBody}>
      <View style={styles.topbar}>
        <TouchableOpacity>
          <icons.arrowBackLeft height={30} width={30} />
        </TouchableOpacity>

        <Text style={styles.title}>
          {date} {meals}
        </Text>

        <TouchableOpacity>
          <icons.arrowBackRight height={30} width={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <Text style={styles.mainTitle}>
          {date} {meals}으로 먹은 음식을 기록해보세요!
        </Text>
        <View style={styles.mainRecord}>
          <ScrollView>
            {mealList.map((meal, index) => (
              <DiaryCard
                key={index}
                restaurant={meal.restaurant}
                menu={meal.menu}
                price={meal.price}
                kcal={meal.kcal}
                people={meal.people}
                onIncreasePeople={() => increasePeople(index)}
                onDecreasePeople={() => decreasePeople(index)}
                onDelete={() => deleteMeal(index)}
              />
            ))}
            {mealList.length === 0 && (
              <Text style={styles.cardDescription}>
                밑의 +버튼으로 메뉴를 추가해주세요
              </Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.recordIconContainer}>
          <icons.addMenu style={styles.recordIcon} height={74} width={74} />
          <TouchableOpacity
            style={styles.recordIconContainer}
            onPress={openModal}>
            <icons.plusWhiteReverse height={20} width={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.restaurant}>
        <View style={styles.restaurantTitle}>
          <TouchableOpacity onPress={goToPreviousRestaurant}>
            <icons.arrowBackLeft height={24} width={24} />
          </TouchableOpacity>
          <Text style={styles.restaurantTitleText}>
            {' '}
            {restaurants[restaurantIndex].name}
          </Text>
          <TouchableOpacity onPress={goToNextRestaurant}>
            <icons.arrowBackRight height={24} width={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.restaurantMenuContainer}>
          <ScrollView>
            {restaurants[restaurantIndex].menus.map((menu, index) => (
              <MenuCard
                key={index}
                isFavorate={menu.isFavorate}
                menu={menu.menu}
                kcal={menu.kcal}
                price={menu.price}
                onToggleFavorite={() => toggleFavorite(index)}
                onAddMeal={() => addMeal(index)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonTitle}>식비</Text>
          <Text style={styles.buttonCost}>
            {Math.round(
              mealList.reduce((sum, meal) => sum + meal.price / meal.people, 0),
            )}
            원
          </Text>
        </View>
        <CustomButton
          title="등록"
          handlePress={() => navigation.navigate('Home')}
          containerStyles="w-[36%] h-[60px] bg-primary"
          textStyles="text-white font-pbold "
        />
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomButton
              title="추가"
              handlePress={closeModal}
              containerStyles="w-[80%] h-[60px]"
              textStyles="text-white"
            />
            <CustomButton
              title="취소"
              handlePress={closeModal}
              containerStyles="w-[80%] h-[60px] bg-gray"
              textStyles="text-white"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DiaryCreateScreen;
