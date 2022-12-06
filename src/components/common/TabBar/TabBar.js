import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import images from '@assets/images';
import { ImageLoad, Indicator } from '@components/common';
import { Colors, Globals } from '@constants/GlobalStyles';
import { profilePhotosUrl } from '@lib/Settings';
import styles from './TabBar.styles';

let renderBadge = (displayCount, badgeAdjust, active) => {
  const color = active ? '#2a3037' : Colors.buttonMain;

  return (
    <Indicator
      small
      color={color}
      numberText={displayCount}
      style={{ ...styles.indicator, right: badgeAdjust }}
    />
  );
};

let renderIcon = (active, data, user, appointments, pubnub) => {
  const icon = active ? data.icon : data.iconInactive;
  const textStyle = active ? styles.textOn : styles.textOff;

  if (data.name === 'Home' && user.profilePhoto) {
    const borderStyle = active ? styles.tabActive : styles.tabInactive;
    return (
      <View style={[styles.profilePhotoWrap, borderStyle]}>
        <Image
          style={styles.thumbPlaceholder}
          source={images.bottomNavHomePlaceholder}
        />
      </View>
    );
  } else if (data.name === 'Home' && !user.profilePhoto) {
    const borderStyle = active
      ? styles.placeholderActive
      : styles.placeholderInactive;
    return (
      <View style={[styles.profilePhotoWrap, borderStyle]}>
        <Image
          style={styles.thumbPlaceholder}
          source={images.bottomNavHomePlaceholder}
        />
      </View>
    );
  }

  let displayCount = null;
  if (data.name === 'Alerts') {
    displayCount = appointments.length.toString();
  } else if (data.name === 'Messaging') {
    displayCount =
      pubnub.unreadsTotal > 0 ? pubnub.unreadsTotal.toString() : null;
  }

  /*
  let displayCount = null;
  if (data.name === 'Documents') {
    //displayCount = appointments.length.toString();
  } else if (data.name === 'Messaging') {
    displayCount = pubnub.unreadsTotal > 0 ? pubnub.unreadsTotal.toString() : null;
  }
*/

  return (
    <View style={styles.tabContainter}>
      <Image
        style={{ width: data.size, height: data.size }}
        source={icon}
        resizeMode="contain"
      />
      <Text style={textStyle}>{data.name}</Text>
      {displayCount
        ? renderBadge(displayCount, data.badgeAdjust, active)
        : null}
    </View>
  );
};

class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      navigation,
      tabData,
      role,
      userPatient,
      userCaregiver,
      appointments,
      pubnub
    } = this.props;
    const { index } = navigation.state;

    let user = {};
    if (role === 'patient') {
      user = userPatient;
    } else {
      user = userCaregiver;
    }

    return (
      <SafeAreaView style={Globals.safeAreaViewTabBar}>
        <View style={styles.container}>
          <View style={styles.tabs}>
            {tabData.map((route, idx) => {
              const active = index === idx;
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(route.route, {
                      source: 'tabs'
                    });
                  }}
                  activeOpacity={1}
                  key={idx}
                  style={styles.tabs}>
                  {renderIcon(active, tabData[idx], user, appointments, pubnub)}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
    isUserSignedIn: state.auth.isUserSignedIn,
    role: state.auth.role,
    subRole: state.auth.subRole,
    userPatient: state.auth.userPatient,
    userCaregiver: state.auth.userCaregiver,
    appointments: state.todaysAppointments.appointments,
    pubnub: state.pubnub
  };
};

export default connect(mapStateToProps, {})(TabBar);
