import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Modal} from 'react-native';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {icons} from '../../../constants';

import {styles} from './DiaryCreateScreen.styles';
import CustomButton from '../../../components/CustomButton';
import DiaryCard from '../components/DiaryCard/DiaryCard';
import MenuCard from '../../../components/MenuCard/MenuCard';

import CustomMenuModal from '../components/CustomMenuModal/CustomMenuModal';
import AddMenuModal from '../components/AddMenuModal/AddMenuModal';
type DiaryCreateScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DiaryCreate'
>;
type DiaryCreateRouteProp = RouteProp<RootStackParamList, 'DiaryCreate'>;
const calculateNutrients = (
  value: number,
  carbPercentage: number,
  proteinPercentage: number,
  fatPercentage: number,
) => {
  const newCarbohydrate = (carbPercentage / 100) * value;
  const newProtein = (proteinPercentage / 100) * value;
  const newFat = (fatPercentage / 100) * value;
  const newCalories = newFat * 9 + newCarbohydrate * 3 + newProtein * 3;

  return {newCarbohydrate, newProtein, newFat, newCalories};
};

const DiaryCreateScreen: React.FC = () => {
  const navigation = useNavigation<DiaryCreateScreenNavigationProp>();
  const route = useRoute<DiaryCreateRouteProp>();
  const {date, meals} = route.params;

  const [isModalVisible, setModalVisible] = useState(false); // 모달 상태
  const [modalType, setModalType] = useState('main'); // 기본 모달 상태

  // 모달 열기 및 닫기
  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalType('main'); // 모달 닫힐 때 기본 모달로 전환
    setModalVisible(false);
  };
  const [form, setForm] = useState({
    restaurant_name: '',
    restaurant_type: '',
    menu_name: '',
    menu_calories: 0,
    menu_carbohydrate: 0,
    menu_protein: 0,
    menu_fat: 0,
    menu_type: 0,
    menu_price: 0,
    menu_value: 0,
  });
  // totalNutrients 상태 추가
  const [totalNutrients, setTotalNutrients] = useState(
    form.menu_carbohydrate + form.menu_protein + form.menu_fat,
  );

  // 탄단지 비율
  const [carbPercentage, setCardPercentage] = useState(33.33);
  const [proteinPercentage, setProteinPercentage] = useState(33.33);
  const [fatPercentage, setFatPercentage] = useState(33.33);

  // form의 탄수화물, 단백질, 지방이 변경될 때 totalNutrients 값 업데이트
  useEffect(() => {
    const newTotalNutrients =
      form.menu_carbohydrate + form.menu_protein + form.menu_fat;

    // 초기 값이 모두 0일 때는 비율을 1/3씩으로 설정
    if (newTotalNutrients === 0) {
      setCardPercentage(33.33);
      setProteinPercentage(33.33);
      setFatPercentage(33.33);
    } else {
      setTotalNutrients(newTotalNutrients);
      setCardPercentage(
        Math.round((form.menu_carbohydrate / newTotalNutrients) * 100),
      );
      setProteinPercentage(
        Math.round((form.menu_protein / newTotalNutrients) * 100),
      );
      setFatPercentage(Math.round((form.menu_fat / newTotalNutrients) * 100));
    }
  }, [form.menu_carbohydrate, form.menu_protein, form.menu_fat]);

  // 용량을 변경할 때 탄단지 및 칼로리 업데이트
  useEffect(() => {
    const {newCarbohydrate, newProtein, newFat, newCalories} =
      calculateNutrients(
        totalNutrients,
        carbPercentage,
        proteinPercentage,
        fatPercentage,
      );

    // 값이 변경될 때만 setForm을 호출하여 무한 루프 방지
    if (
      totalNutrients !== 0 &&
      (form.menu_carbohydrate !== newCarbohydrate ||
        form.menu_protein !== newProtein ||
        form.menu_fat !== newFat ||
        form.menu_calories !== newCalories)
    ) {
      setForm({
        ...form,
        menu_carbohydrate: newCarbohydrate,
        menu_protein: newProtein,
        menu_fat: newFat,
        menu_calories: newCalories,
      });
    }
  }, [totalNutrients]); // 용량 변경 시에만 실행되도록 의존성 배열 설정

  //여기서 메뉴추가 axios요청 보냄
  const addMealToList = () => {
    setMealList(prevMealList => [
      ...prevMealList,
      {
        restaurant: restaurantValue || '집밥', // 식당 이름 없으면 기본값
        menu: form.menu_name,
        price: form.menu_price,
        kcal: form.menu_calories,
        people: 1,
      },
    ]);
    closeModal(); // 모달 닫기
  };
  // 모달 내용 변경 (직접 등록)
  const openCustomMenuModal = () => setModalType('custom');
  const [isHomeMade, setIsHomeMade] = useState(false);
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
  const [isRestaurantOpen, setIsRestaurantOpen] = useState<boolean>(false);
  const [restaurantValue, setRestaurantValue] = useState<string | null>(null); // 선택된 식당 값
  // 레스토랑을 DropDownPicker에 맞는 {label, value} 형식으로 변환
  const restaurantItems = restaurants.map(restaurant => ({
    label: restaurant.name,
    value: restaurant.name,
  }));

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
    setRestaurantIndex(restaurantIndex);
    setRestaurants(updatedRestaurants);
  };
  const toggleHomeMade = () => {
    setIsHomeMade(!isHomeMade);
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
        people: 1,
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
          containerStyles="w-[24%] h-[50px] bg-primary"
          textStyles="text-white font-pbold "
        />
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          {modalType === 'main' ? (
            <AddMenuModal
              onClose={closeModal}
              onOpenCustomMenuModal={openCustomMenuModal}
            />
          ) : (
            <CustomMenuModal
              form={form}
              setForm={setForm}
              restaurantValue={restaurantValue}
              restaurantItems={restaurantItems}
              isRestaurantOpen={isRestaurantOpen}
              setIsRestaurantOpen={setIsRestaurantOpen}
              setRestaurantValue={setRestaurantValue}
              carbPercentage={carbPercentage}
              proteinPercentage={proteinPercentage}
              fatPercentage={fatPercentage}
              totalNutrients={totalNutrients}
              setTotalNutrients={setTotalNutrients}
              onClose={closeModal}
              addMealToList={addMealToList}
              isHomeMade={isHomeMade}
              toggleHomeMade={toggleHomeMade}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default DiaryCreateScreen;
