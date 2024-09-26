import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {icons} from '../../../constants';
import {images} from '../../../constants';
import {styles} from './DiaryCreateScreen.styles';
import CustomButton from '../../../components/CustomButton';
import DiaryCard from '../components/DiaryCard/DiaryCard';
import MenuCard from '../components/MenuCard/MenuCard';
import FormField from '../../../components/FormField/FormField';

type DiaryCreateScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DiaryCreate'
>;
type DiaryCreateRouteProp = RouteProp<RootStackParamList, 'DiaryCreate'>;

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
    menu_calories: 450,
    menu_carbohydrate: 70,
    menu_protein: 10,
    menu_fat: 20,
    menu_type: 1,
    menu_price: 0,
    menu_value: 1,
  });
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
    setRestaurantIndex(restaurantIndex);
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
        people: 1,
      },
    ]);
  };

  // 모달 내용 변경 (직접 등록)
  const openCustomMenuModal = () => setModalType('custom');

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

      {/* 모달 */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalType === 'main' ? (
              // 기본 모달
              <>
                <View style={styles.modalTitle}>
                  <Text style={styles.modalTitleText}>메뉴 추가</Text>
                  <TouchableOpacity
                    style={styles.modalIcon}
                    onPress={closeModal}>
                    <icons.exit height={24} width={24} />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text>검색창</Text>
                </View>
                <View style={styles.addMenu}>
                  <TouchableOpacity style={styles.addMenuContainer}>
                    <Image
                      source={images.addMenuCamera}
                      style={styles.addMenuImage}
                    />
                    <Text style={styles.addMenuContainerText}>
                      사진으로 등록
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addMenuContainer}
                    onPress={openCustomMenuModal}>
                    <Image
                      source={images.addMenu}
                      style={styles.addMenuImage}
                    />
                    <Text style={styles.addMenuContainerText}>직접 등록</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              // 직접 등록 모달
              <>
                <View style={styles.modalTitle}>
                  <Text style={styles.modalTitleText}>메뉴 등록</Text>
                  <TouchableOpacity
                    style={styles.modalIcon}
                    onPress={closeModal}>
                    <icons.exit height={24} width={24} />
                  </TouchableOpacity>
                </View>
                <View style={styles.menuFormContainer}>
                  <Text>직접 등록할 메뉴 정보를 입력하세요</Text>
                  <FormField
                    title="이름"
                    value={form.menu_name}
                    handleChangeText={text =>
                      setForm({...form, menu_name: text})
                    }
                    placeholder="식당 이름"
                  />
                  <FormField
                    title="가게 이름"
                    value={form.restaurant_name}
                    handleChangeText={text =>
                      setForm({...form, restaurant_name: text})
                    }
                    otherStyles={styles.field}
                    placeholder="메뉴 이름"
                  />
                  <FormField
                    title="가격"
                    value={String(form.menu_price)}
                    unit="원"
                    handleChangeText={text =>
                      setForm({...form, menu_price: Number(text)})
                    }
                    otherStyles={styles.field}
                    placeholder="0"
                    isNumeric={true}
                    isDecimal={false}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DiaryCreateScreen;
