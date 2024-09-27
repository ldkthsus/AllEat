import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {icons} from '../../../../constants';
import {images} from '../../../../constants';
import {styles} from './AddMenuModal.styles';

interface AddMenuModalProps {
  onClose: () => void;
  onOpenCustomMenuModal: () => void;
}

const AddMenuModal: React.FC<AddMenuModalProps> = ({
  onClose,
  onOpenCustomMenuModal,
}) => {
  return (
    <View style={styles.modalContent}>
      <View style={styles.modalTitle}>
        <Text style={styles.modalTitleText}>메뉴 추가</Text>
        <TouchableOpacity style={styles.modalIcon} onPress={onClose}>
          <icons.exit height={24} width={24} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>검색창</Text>
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
