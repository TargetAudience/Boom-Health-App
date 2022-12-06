import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 13.5
  },
  invitesWrap: {
    backgroundColor: 'rgba(16, 100, 168, 0.08)',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(16, 100, 168, 0.08)'
  },
  textInviteNameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  textInviteName: {
    textAlign: 'left',
    color: '#000',
    fontSize: 13.5
  },
  textInviteEmail: {
    textAlign: 'left',
    color: '#000',
    fontSize: 13.5,
    fontWeight: '400',
    marginTop: 3
  },
  inviteGapTop: {
    marginTop: 16
  },
  edit: {
    width: 15,
    height: 15
  },
  inviteContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  textSubTitle: {
    textAlign: 'left',
    color: Colors.textMain,
    fontSize: 14.5,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 12
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  inviteButtonMargins: {
    marginTop: 16,
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    marginTop: 16
  },
  textNone: {
    textAlign: 'left',
    color: '#1c1c1c',
    fontSize: 14.5,
    marginBottom: 8,
    marginLeft: 20
  },
  admin: {
    width: 9,
    height: 16,
    marginLeft: 10
  },
  chat: {
    width: 14,
    height: 14
  },
  permissionsGroupPurchase: {
    width: 14,
    height: 14
  },
  permissionsBlocked: {
    width: 16,
    height: 16
  },
  textInviteAdmin: {
    textAlign: 'left',
    color: '#1c1c1c',
    fontSize: 11.5,
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: Platform.OS === 'ios' ? 1 : -1
  },
  textBlocked: {
    textAlign: 'left',
    color: Colors.redText,
    fontSize: 11.5,
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 2
  },
  textInviteIcon: {
    textAlign: 'left',
    color: Colors.textMain,
    fontSize: 11.5,
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: Platform.OS === 'ios' ? 0 : -1
  },
  roleContainer: {
    marginTop: 5,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  blockedContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  strikethrough: {
    textDecorationLine: 'line-through'
  }
});

export default styles;
