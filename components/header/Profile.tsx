import React, { FunctionComponent, useEffect, useState } from "react";
import { ImageSourcePropType, GestureResponderEvent, StyleProp, ViewStyle, ImageStyle, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import BigText from "../texts/BIgText";

const StyledView = styled.TouchableOpacity`
  flex-direction: column;
  height: 45px;
  width: 45px;
  border-radius: 15px;
`;

const StyledImage = styled.Image`
  resize-mode: cover;
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

interface ProfileProps {
  img?: ImageSourcePropType;
  ImgStyle?: StyleProp<ImageStyle>;
  imgContainerStyle?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

import defaultAvatar from '../../assets/avatar.jpeg';

const Profile: FunctionComponent<ProfileProps> = (props) => {
  const [image, setImage] = useState({ uri: defaultAvatar });
  const [galleryPermission, setGalleryPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus.status === 'granted') {
        setGalleryPermission(true);
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled && result.assets) {
      setImage(result.assets[0]);
    }
  };

  if (galleryPermission === false) {
    return <BigText>No access to internal storage</BigText>
  }

  return (
    <StyledView onPress={() => pickImage()} style={props.imgContainerStyle}>
      {image && <StyledImage style={props.ImgStyle} source={image.uri ? { uri: image.uri } : defaultAvatar} />}
    </StyledView>
  )
};

export default Profile;
