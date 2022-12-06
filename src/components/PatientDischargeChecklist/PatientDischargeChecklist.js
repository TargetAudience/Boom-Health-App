import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {Actionsheet, Box} from 'native-base';
////import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  AppButton,
  PatientDischargeAddEditModal,
  PatientDischargeNotifyModal,
  AppText,
  LoaderList,
} from '@components/common';
import {Colors} from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientDischargeChecklist.styles';

import TasksApi from '@api/tasksApi';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

const {width} = Dimensions.get('screen');

class PatientDischargeChecklist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddEditModalOpen: false,
      isNotifyModalOpen: false,
      people: [],
      tasks: [],
      isLoading: false,
      selectedItem: null,
      isActionSheetOpen: false,
      markAsCompleteLabel: 'Mark Task as Complete',
    };

    ////this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadData();
    ////this.mixpanel.track('View Patient Discharge Checklist');
  }

  async loadData() {
    this.setState({isLoading: true});

    //setTimeout(() => {
    TasksApi.getTasks()
      .promise.then(async result => {
        const peopleArr = result.data.people;
        const tasksArr = result.data.tasks;

        this.setState({tasks: tasksArr}, () => {
          //console.log('tasks', this.state.tasks);
        });

        this.setState({people: peopleArr}, () => {
          //console.log('people', this.state.people);
        });

        this.setState({isLoading: false}, () => {
          //console.log('this.state.isLoading', this.state.isLoading);
        });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({isLoading: false});
        const {actions} = this.props;
        actions.setAlert(error.data.error);
      });
    //}, 300);
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientHome');
  };

  onPressActionSheet = buttonIndex => {
    if (buttonIndex === 0) {
      this.checkUncheck();
    } else if (buttonIndex === 1) {
      this.setState({
        isAddEditModalOpen: true,
      });
    } else if (buttonIndex === 2) {
      this.removeTask();
    }
    this.onClose();
  };

  onPressModalClose = () => {
    this.setState({
      isNotifyModalOpen: false,
    });
  };

  onPressAddEditModalClose = () => {
    this.setState({
      isAddEditModalOpen: false,
    });
  };

  onAddEditModalCloseCallBack = tasks => {
    this.setState({
      tasks,
    });
  };

  onPressAddTask = () => {
    this.setState({
      isAddEditModalOpen: true,
      selectedItem: null,
    });
  };

  onPressSendLink = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientDischargeSendLink');
  };

  onPressAddEditPerson = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientDischargePeople');
  };

  onPressMenu = item => {
    const selectedItem = this.getTaskId(item);

    let markAsCompleteLabel;
    if (selectedItem.checked) {
      markAsCompleteLabel = 'Mark Task as Incomplete';
    } else {
      markAsCompleteLabel = 'Mark Task as Complete';
    }

    this.setState({
      markAsCompleteLabel,
      isActionSheetOpen: true,
      selectedItem,
    });
  };

  onClose = () => {
    this.setState({
      isActionSheetOpen: false,
    });
  };

  onPressSettings = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientDischargeSettings');
  };

  getTaskId = taskId => {
    const {tasks} = this.state;

    for (const sectionData of tasks) {
      const {data} = sectionData;
      const filteredData = data.find(element => element.taskId === taskId);
      if (filteredData) {
        return filteredData;
      }
    }
    return null;
  };

  updateCheckmark = task => {
    const {tasks} = this.state;

    for (const sectionData of tasks) {
      const {data} = sectionData;
      data.forEach(item => {
        if (item.taskId === task.taskId) {
          item.checked = !item.checked;
        }
      });
    }
    this.setState({tasks});
  };

  updateRemoveTask = task => {
    const {tasks} = this.state;

    for (const sectionData of tasks) {
      const {data} = sectionData;
      let i = 0;
      while (i < data.length) {
        if (data[i]['taskId'] === task.taskId) {
          data.splice(i, 1);
        } else i++;
      }
    }
    this.setState({tasks});
  };

  tasksExist = () => {
    const {tasks} = this.state;

    if (!tasks.length) return false;

    for (const sectionData of tasks) {
      const {data} = sectionData;
      if (data.length) {
        return true;
      }
    }
    return false;
  };

  removeTask = () => {
    const {actions} = this.props;
    const {selectedItem} = this.state;

    this.updateRemoveTask(selectedItem);

    actions.setAlert('The task has been removed.');

    TasksApi.removeTask({taskId: selectedItem.taskId})
      .promise.then(() => {
        this.setState({isLoading: false});
      })
      .catch(error => {
        console.log('error jos', error);
        this.setState({isLoading: false});
        actions.setAlert(error.data.error);
      });
  };

  checkUncheck = () => {
    const {selectedItem} = this.state;

    this.updateCheckmark(selectedItem);

    TasksApi.checkUncheck({taskId: selectedItem.taskId})
      .promise.then(result => {
        const tasks = result.data.tasks;

        this.setState({isLoading: false, tasks});
        this.forceUpdate();
      })
      .catch(error => {
        console.log('error', error);
        this.setState({isLoading: false});
        actions.setAlert(error.data.error);
      });
  };

  keyExtractor = item => {
    return `key_${item.taskId}`;
  };

  renderRowItem = data => {
    const {
      item,
      section: {title},
    } = data;

    const displayTitle = data.index === 0 ? title : '';
    const gapStyle =
      data.section.type === 'FAMILY_TASKS' && data.index === 0
        ? styles.gapMiddle
        : null;
    const isFamilyTask = data.section.type === 'FAMILY_TASKS' ? true : false;
    const showAssignee = isFamilyTask && data.item.personId ? true : false;
    const showUnassigned = isFamilyTask && !data.item.personId ? true : false;
    const isChecked = data.item.checked ? true : false;

    return (
      <View style={[styles.cellContainer, gapStyle]}>
        {displayTitle ? (
          <View style={styles.cellTop}>
            <AppText textWeight="500" style={styles.textTitleSection}>
              {title}
            </AppText>
          </View>
        ) : null}
        <View style={styles.cellInner}>
          {isChecked ? (
            <Image
              style={styles.iconCheckmark}
              source={images.checkmarkGreen}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={styles.iconCheckmark}
              source={images.checkboxUnchecked}
              resizeMode="cover"
            />
          )}
          <View style={styles.outerContainer}>
            <View style={styles.textContainer}>
              <AppText textWeight="400" style={styles.textTask}>
                {item.taskName}
              </AppText>
              {showAssignee ? (
                <AppText textWeight="300" style={styles.textAssignee}>
                  <AppText textWeight="300" style={styles.textAssigneeLabel}>
                    Assigned to:{' '}
                  </AppText>
                  {item.firstName} {item.lastName}
                </AppText>
              ) : null}
              {showUnassigned ? (
                <AppText textWeight="300" style={styles.textAssigneeLabel}>
                  Unassigned
                </AppText>
              ) : null}
            </View>
            <View style={styles.rightButtonContainer}>
              <TouchableHighlight
                onPress={() => this.onPressMenu(item.taskId)}
                underlayColor="transparent"
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
                <Image
                  source={images.downArrowButton}
                  style={styles.downArrowIcon}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderBottomButtons = () => {
    return (
      <>
        {!this.tasksExist() ? (
          <View style={styles.instructionsContainer}>
            <AppText style={styles.instructionsText} textWeight="300">
              Add tasks and assign to yourself or others. Start by tapping Add
              Task below.
            </AppText>
          </View>
        ) : null}
        <View style={styles.buttonsContainer}>
          <AppButton
            onPress={this.onPressAddTask}
            width={width - 20}
            height={38}
            backgroundColor={Colors.buttonMain}
            disabled={false}
            style={styles.button}>
            <AppText textWeight="500" style={styles.buttonText}>
              Add Task
            </AppText>
          </AppButton>
          <AppButton
            onPress={this.onPressAddEditPerson}
            width={width - 20}
            height={38}
            backgroundColor={Colors.darkGrayButton}
            disabled={false}
            style={styles.button}>
            <AppText textWeight="500" style={styles.buttonText}>
              View or Manage People
            </AppText>
          </AppButton>
          <AppButton
            onPress={this.onPressSendLink}
            width={width - 20}
            height={38}
            backgroundColor={Colors.darkGrayButton}
            disabled={false}
            style={styles.button}>
            <AppText textWeight="500" style={styles.buttonText}>
              Send Link to Discharge Nurse
            </AppText>
          </AppButton>
        </View>
      </>
    );
  };

  render() {
    const {
      isLoading,
      tasks,
      people,
      isActionSheetOpen,
      isAddEditModalOpen,
      isNotifyModalOpen,
      selectedItem,
      markAsCompleteLabel,
    } = this.state;

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={[styles.container, {paddingTop: insets.top}]}>
            <CustomHeaderBack
              title="Discharge Followup Tasks"
              onPressBack={this.onPressBack}
              onPressSettings={this.onPressSettings}
            />
            <View style={styles.containerB}>
              <LoaderList loading={isLoading} />
              {!isLoading ? (
                <SectionList
                  ref={ref => {
                    this.listRef = ref;
                  }}
                  style={styles.sectionList}
                  stickySectionHeadersEnabled={false}
                  removeClippedSubviews
                  initialNumToRender={20}
                  onEndReachedThreshold={1200}
                  keyExtractor={this.keyExtractor}
                  extraData={this.state}
                  sections={tasks}
                  renderItem={this.renderRowItem}
                  renderSectionHeader={this.renderHeader}
                  ListFooterComponent={this.renderBottomButtons}
                />
              ) : null}
            </View>
            <Actionsheet
              isOpen={isActionSheetOpen}
              onClose={this.onClose}
              size="full"
              hideDragIndicator="true">
              <Actionsheet.Content bg="#f3f3f3">
                <Actionsheet.Item
                  _pressed={{bg: '#e8e8e8'}}
                  alignItems={'center'}
                  bg="transparent"
                  onPress={() => {
                    this.onPressActionSheet(0);
                  }}>
                  <Box w="100%" h={7} px={4} justifyContent="center">
                    <Text style={styles.textActionSheet}>
                      {markAsCompleteLabel}
                    </Text>
                  </Box>
                </Actionsheet.Item>
                <View style={styles.divider} />
                <Actionsheet.Item
                  _pressed={{bg: '#e8e8e8'}}
                  alignItems={'center'}
                  bg="transparent"
                  onPress={() => {
                    this.onPressActionSheet(1);
                  }}>
                  <Box w="100%" h={7} px={4} justifyContent="center">
                    <Text style={styles.textActionSheet}>Edit Task</Text>
                  </Box>
                </Actionsheet.Item>
                <View style={styles.divider} />
                <Actionsheet.Item
                  _pressed={{bg: '#e8e8e8'}}
                  alignItems={'center'}
                  bg="transparent"
                  onPress={() => {
                    this.onPressActionSheet(2);
                  }}>
                  <Box w="100%" h={7} px={4} justifyContent="center">
                    <Text style={styles.textActionSheet}>Remove Task</Text>
                  </Box>
                </Actionsheet.Item>
                <View style={styles.divider} />
                <Actionsheet.Item
                  _pressed={{bg: '#e8e8e8'}}
                  alignItems={'center'}
                  bg="transparent"
                  onPress={() => {
                    this.onPressActionSheet(3);
                  }}>
                  <Box w="100%" h={7} px={4} justifyContent="center">
                    <Text style={styles.textActionSheetCancel}>Cancel</Text>
                  </Box>
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
            <PatientDischargeAddEditModal
              selectedItem={selectedItem}
              people={people}
              isModalOpen={isAddEditModalOpen}
              onPressCloseButton={this.onPressAddEditModalClose}
              onCloseCallback={this.onAddEditModalCloseCallBack}
            />
            <PatientDischargeNotifyModal
              isModalOpen={isNotifyModalOpen}
              onPressCloseButton={this.onPressModalClose}
            />
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  subRole: state.auth.subRole,
  transportation: state.transportation,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientDischargeChecklist);
