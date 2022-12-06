import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  topGap: {
    marginTop: 24
  },
  bottomGap: {
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    marginTop: 16
  },
  textSubTitle: {
    textAlign: 'left',
    color: Colors.textMain,
    fontSize: 14.5,
    fontWeight: '600',
    marginBottom: 16,
    marginLeft: 0
  },
  profilePhotoContainer: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ececec'
  },
  profilePhoto: {
    marginTop: 1,
    borderRadius: 80 / 2,
    width: 80,
    height: 80
  },
  addPhoto: {
    position: 'absolute',
    bottom: -2,
    left: -4,
    width: 30,
    height: 30
  },
  textRecommended: {
    textAlign: 'center',
    color: '#b5b5b5',
    fontSize: 13.5,
    fontWeight: '400',
    marginTop: 4
  },
  checkbox: {
    marginBottom: 18
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 13.5,
    fontWeight: '600'
  },
  invitesWrap: {
    backgroundColor: 'rgba(16, 100, 168, 0.08)',
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(16, 100, 168, 0.08)',
  },
  textInviteName: {
    textAlign: 'left',
    color: '#000',
    fontSize: 13.5,
    fontWeight: '600'
  },
  textInviteEmail: {
    textAlign: 'left',
    color: '#000',
    fontSize: 13.5,
    fontWeight: '400',
    marginTop: 2
  },
  textInviteRoles: {
    textAlign: 'left',
    color: '#44ab3f',
    fontSize: 13.5,
    fontWeight: '400',
    marginTop: 2
  },
  inviteGapTop: {
    marginTop: 16
  },
  imageRemoveInvite: {
    width: 16,
    height: 16
  },
  inviteContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  textInstructions: {
    textAlign: 'left',
    color: '#1c1c1c',
    fontSize: 14.5,
    fontWeight: '500',
    marginBottom: 16,
    marginLeft: 2
  },
  selectBox: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.formFieldBackground,
    height: 46,
    borderRadius: 5,
    borderColor: Colors.formFieldBorder,
    borderWidth: 1,
    width: '100%'
  }
});

export default styles;
