import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImageObject, IProps, RenderImageProps } from './types';
import ImagePreview from './ImagePreview';
import PanContainer from './PanContainer';
import Carousel from 'react-native-reanimated-carousel';
import img from '@assets/images';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const defaultProps = {
  hideThumbs: false,
  resizeMode: 'contain',
  thumbColor: '#d9b44a',
  thumbResizeMode: 'cover',
  thumbSize: 48,
};

const ImageGallery = (props: IProps & typeof defaultProps) => {
  const {
    close,
    hideThumbs,
    images,
    initialIndex,
    isOpen,
    renderCustomImage,
    renderCustomThumb,
    renderFooterComponent,
    renderHeaderComponent,
    resizeMode,
    thumbColor,
    thumbResizeMode,
    thumbSize,
  } = props;

  const carouselRef =useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const topRef = useRef<FlatList>(null);
  const bottomRef = useRef<FlatList>(null);

  const keyExtractorThumb = (item: ImageObject, index: number) =>
    item && item.id ? item.id.toString() : index.toString();
  const keyExtractorImage = (item: ImageObject, index: number) =>
    item && item.id ? item.id.toString() : index.toString();

  const scrollToIndex = (i: number) => {
    setActiveIndex(i);
    carouselRef.current.scrollTo({index:i, animated:true});

  
    if (bottomRef?.current) {
      if (i * (thumbSize + 10) - thumbSize / 2 > deviceWidth / 2) {
        bottomRef?.current?.scrollToIndex({
          animated: true,
          index: i,
        });
      } else {
        bottomRef?.current?.scrollToIndex({
          animated: true,
          index: 0,
        });
      }
    }
  };

  const renderItem = ({ item, index }: RenderImageProps) => {
    return (
      <ImagePreview
        index={index}
        isSelected={activeIndex === index}
        item={item}
        resizeMode={resizeMode}
        renderCustomImage={renderCustomImage}
      />
    );
  };

  const renderThumb = ({ item, index }: RenderImageProps) => {
    return (
      <TouchableOpacity
        onPress={() => scrollToIndex(index)}
        activeOpacity={0.8}
      >
        {renderCustomThumb ? (
          renderCustomThumb(item, index, activeIndex === index)
        ) : (
          <Image
            resizeMode={thumbResizeMode}
            style={
              activeIndex === index
                ? [
                    styles.thumb,
                    styles.activeThumb,
                    { borderColor: thumbColor },
                    { width: thumbSize, height: thumbSize },
                  ]
                : [styles.thumb, { width: thumbSize, height: thumbSize }]
            }
            source={item.thumbUrl ? item.thumbUrl : item.url}
          />
        )}
      </TouchableOpacity>
    );
  };

  const onMomentumEnd = (e: any) => {
    const { x } = e.nativeEvent.contentOffset;
    scrollToIndex(Math.round(x / deviceWidth));
  };

  useEffect(() => {
    if (isOpen && initialIndex) {
      setActiveIndex(initialIndex);
    } else if (!isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen, initialIndex]);

  const getImageLayout = useCallback((_, index) => {
    return {
      index,
      length: deviceWidth,
      offset: deviceWidth * index,
    };
  }, []);

  const getThumbLayout = useCallback(
    (_, index) => {
      return {
        index,
        length: thumbSize,
        offset: thumbSize * index,
      };
    },
    [thumbSize]
  );

  const renderCarousel = () => {
    const data = [img.food1, img.food2, img.food3, img.food4, img.food5];

    const renderItemWidth = deviceWidth * 0.85;

    return (
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          mode="parallax"
          width={deviceWidth - 40}
          height={deviceWidth / 2}
          scrollAnimationDuration={1000}
          onSnapToItem={index => setActiveIndex(index)}
          loop={false}
          data={data}
          renderItem={({ index }) => {
            return (
              <View
                style={[styles.cardContainer, { width: renderItemWidth }]}
                key={`image_${index}`}
              >
                <Image
                  source={data[index]}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <Modal animationType={isOpen ? 'slide' : 'fade'} visible={isOpen}>
      <View style={styles.container}>
        {renderCarousel()}
        {renderHeaderComponent ? (
          <View style={styles.header}>
            {renderHeaderComponent(images[activeIndex], activeIndex)}
          </View>
        ) : null}
        <FlatList
          initialScrollIndex={initialIndex}
          getItemLayout={getThumbLayout}
          contentContainerStyle={styles.thumbnailListContainer}
          data={props.images}
          horizontal
          keyExtractor={keyExtractorThumb}
          pagingEnabled
          ref={bottomRef}
          renderItem={renderThumb}
          showsHorizontalScrollIndicator={false}
          style={[styles.bottomFlatlist, { bottom: thumbSize }]}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
  },
  cardImage: {
    height: 209,
    width: 290,
    borderRadius: 16,
  },
  contentContainerCustomStyle: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
    height: deviceHeight,
    justifyContent: 'center',
    width: deviceWidth,
  },
  header: {
    position: 'absolute',
    top: 20,
    width: '100%',
  },
  activeThumb: {
    borderWidth: 3,
  },
  thumb: {
    borderRadius: 12,
    marginRight: 10,
  },
  thumbnailListContainer: {
    paddingHorizontal: 10,
  },
  bottomFlatlist: {
    position: 'absolute',
  },
});

ImageGallery.defaultProps = defaultProps;

export default ImageGallery;
