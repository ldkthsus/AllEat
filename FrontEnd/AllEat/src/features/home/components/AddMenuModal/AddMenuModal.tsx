import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import {icons} from '../../../../constants';
import {images} from '../../../../constants';
import {styles} from './AddMenuModal.styles';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {
  setSearchQuery,
  toggleFavorite,
} from '../../../../redux/features/menuSlice';
import FormField from '../../../../components/FormField/FormField';
import MenuCard from '../../../../components/MenuCard/MenuCard';
import {AppDispatch} from '../../../../redux/store';
import {fetchMenus} from '../../../../redux/features/menuSlice';
import api from '../../../../utils/api';
interface AddMenuModalProps {
  onClose: () => void;
  onOpenCustomMenuModal: () => void;
  onAddMeal: (menu: any) => void; // 메뉴를 추가할 때, 해당 메뉴를 넘겨줌
}

const AddMenuModal: React.FC<AddMenuModalProps> = ({
  onClose,
  onOpenCustomMenuModal,
  onAddMeal,
}) => {
  const dispatch = useDispatch<AppDispatch>(); // AppDispatch로 타입 설정

  const {menus, searchQuery, loading, error} = useSelector(
    (state: RootState) => state.menu,
  );

  // 검색어에 따른 메뉴 필터링
  const filteredMenus = menus.filter(
    menu =>
      menu.menu_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      menu.restaurants_name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 검색어 변경 처리 함수
  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text)); // 검색어 업데이트
  };

  // 검색창 활성화 상태 관리
  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error}</Text>;
  }
  const handleMenuPress = (menu: any) => {
    onAddMeal(menu);
    Keyboard.dismiss(); // 메뉴 선택 후 키보드가 열려 있으면 닫음
    setSearchBoxVisible(false);
  };
  return (
    <View style={styles.modalContent}>
      <View style={styles.modalTitle}>
        <Text style={styles.modalTitleText}>메뉴 추가</Text>
        <TouchableOpacity style={styles.modalIcon} onPress={onClose}>
          <icons.exit height={24} width={24} />
        </TouchableOpacity>
      </View>
      <View>
        {/* 검색창에 handleSearch 함수 제대로 연결 */}
        <FormField
          value={searchQuery}
          handleChangeText={handleSearch} // 검색어 변경 시 호출
          placeholder="검색어 입력"
          onFocus={() => setSearchBoxVisible(true)} // 포커스 시 searchBox 표시
        />
        {isSearchBoxVisible && (
          <View style={styles.searchBox}>
            <ScrollView>
              {filteredMenus.map(menu => (
                <MenuCard
                  key={menu.menu_id}
                  menu={menu.menu_name}
                  isFavorate={menu.favorite}
                  kcal={menu.menu_calories}
                  price={menu.menu_price}
                  onAddMeal={() => handleMenuPress(menu)} // onAddMeal에 선택된 메뉴 전달
                  onToggleFavorite={() =>
                    dispatch(
                      toggleFavorite({
                        menuId: menu.menu_id,
                        favorite: menu.favorite,
                      }),
                    )
                  }
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <View style={styles.addMenu}>
        <TouchableOpacity style={styles.addMenuContainer}>
          <Image source={images.addMenuCamera} style={styles.addMenuImage} />
          <Text style={styles.addMenuContainerText}>사진으로 등록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addMenuContainer}
          onPress={onOpenCustomMenuModal}>
          <Image source={images.addMenu} style={styles.addMenuImage} />
          <Text style={styles.addMenuContainerText}>직접 등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddMenuModal;
