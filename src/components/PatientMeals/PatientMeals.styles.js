import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerB: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    marginBottom: 15,
  },
  cardContainer: {
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'red'
  },
  cardImage: {
    backgroundColor: '#dddddd',
    height: 209,
    width: 290,
    borderRadius: 16,
    borderWidth: 0,
    borderColor: 'red'
  },
  gridImage: {
    height: '100%',
    width: '32%', 
    aspectRatio: 1,
    borderRadius: 10
  },
  moreImage: {
    width: 26,
    height: 26
  },
  gridCell: {
    height: '100%',
    width: '32%', 
    aspectRatio: 1
  },
  gridEmpty: {
    backgroundColor: '#ebeaea',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gapBottom: {
    height: 20
  },
  safeAreaContainer: {
    flex: 1,
  },
  viewLeft: {
    flex: 1
  },
  arrowBack: {
    marginLeft: 16,
    width: 16,
    height: 16
  },
  spacer: {
    width: '100%',
    height: 16,
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textIntro: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    lineHeight: Platform.OS === 'ios' ? 19 : 18,
    paddingLeft: 3
  },
  textIntroTitle: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    lineHeight: 19,
    marginBottom: 5,
    marginTop: 6,
    textTransform: 'uppercase',
    paddingLeft: 10
  },
  introBackground: {
    backgroundColor: '#e6e6e6',
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 6
  },
  textSubstitutions: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 12.5 : normalizeFont(12.5),
    lineHeight: 16,
    marginTop: 12,
    marginLeft: 12,
    marginBottom: 20
  },
  gapTop: {
    marginTop: 12
  },
  introContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: Colors.white
  },
  leaf: {
    width: 25,
    height: 27
  },
  leafContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  leafText: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    lineHeight: Platform.OS === 'ios' ? 19 : 18,
    marginLeft: 10,
    marginRight: 16
  },
  header: {
    width: '100%',
    backgroundColor: '#f4f4f4',
    alignSelf: 'flex-start',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    color: Colors.nearBlack,
  },
  textWeekHeading: {
    backgroundColor: Colors.titleTextMain,
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    paddingTop: 9,
    paddingBottom: 8,
    paddingLeft: 12,
    color: Colors.white,
    textTransform: 'uppercase',
    width: '100%'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'white',
    marginBottom: 2
  },
  priceContainer: {
      marginTop: 2,
      flexDirection: 'column',
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: 'white',
  },
  thumbnail: {
      marginRight: 12
  },
  detail: {
      flex: 1
  },
  name: {
      textAlign: 'left',
      color: '#000',
      fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5)
  },
  imageThumb: {
      width: 60,
      height: 60
  },
  textPrice: {
      textAlign: 'right',
      color: '#000',
      fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5)
  }
});

export default styles;
