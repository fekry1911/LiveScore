import React from 'react';
import { Image } from 'expo-image';
import defaultImage from '../../assets/user.png';

export default function CustomImage({ uri, className }) {
  return (
    <Image
      source={uri || defaultImage}
      className={className}
      placeholder={defaultImage}
      contentFit="cover"
      cachePolicy="disk"
      transition={200}
    />
  );
}
