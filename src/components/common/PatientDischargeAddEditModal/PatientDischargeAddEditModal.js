import React, { PureComponent } from 'react';
import { View, Dimensions, Platform, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
//import MixpanelManager from '@utils/Analytics';
import { ButtonLoading, AppText, InputWithLabel, AlertModal } from '@components/common';
import images from '@assets/images';
import { FormStyles } from '@constants/GlobalStyles';
import styles from './PatientDischargeAddEditModal.styles';

import TasksApi from '@api/tasksApi';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('screen');

class PatientDischargeAddEditModal extends PureComponent {
  constructor(props) {
    super(props);
    console.log('props', props);

    this.state = {
      tasks: [],
      people: [],
      actionLoading: false,
      inputTask: '',
      inputAssignTo: '',
      modalTitle: '',
      buttonLabel: '',
      selectedItem: null,
    };

    this.selectRef = React.createRef();

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  UNSAFE_componentWillReceiveProps(newprops) {
    const { auth } = this.props;

    const selectedItem = newprops.selectedItem;
    const people = newprops.people;

    const peopleList = [];
    const personUnassign = {
      key: 0,
      label: 'Unassign',
      value: 0
    };
    peopleList.push(personUnassign);

    let count = 0;

    for (var key in people) {
      count++;
      const item = people[key];

      let personName;
      if (item.userId === auth.userId) {
        personName = 'Myself';
      } else {
        personName = `${item.firstName} ${item.lastName}`;
      }
      const element = {
        key: count,
        label: personName,
        value: item.personId
      };
      peopleList.push(element);
    }

    if (selectedItem) {
      this.setState({
        modalTitle: 'Edit Task',
        buttonLabel: 'Update Task',
        inputTask: selectedItem.taskName,
        inputAssignTo: selectedItem.personId,
        people: peopleList,
        selectedItem,
      });
    } else {
      this.setState({
        modalTitle: 'Add Task',
        buttonLabel: 'Add Task',
        inputTask: '',
        inputAssignTo: '',
        people: peopleList,
        selectedItem: null,
      });
    }
  }

  onPressClose = () => {
    const { onPressCloseButton, onCloseCallback } = this.props;
    const { tasks } = this.state;

    onPressCloseButton();

    if (tasks.length) {
      onCloseCallback(tasks);
    }

    this.setState({
      actionLoading: false,
      inputTask: '',
      inputAssignTo: '',
      selectedItem: null,
    });
  };

  onSubmit = async () => {
    const { actions } = this.props;
    const { inputTask, inputAssignTo, selectedItem } = this.state;

    if (inputTask === '') {
      actions.setAlertModal('Please enter a task.');
      return;
    }

    this.setState({ actionLoading: true });

    if (!selectedItem) {
      await TasksApi.addTask({
        inputTask,
        inputAssignTo
      })
        .promise.then(async result => {
          const tasks = result.data.tasks;

          this.setState({ actionLoading: false, tasks, inputTask: null, inputAssignTo: null });

          this.onPressClose();

          actions.setAlert('A task has been added.');
          return;
        })
        .catch(error => {
          console.log('tasks error', error);
          this.setState({ actionLoading: false });
          actions.setAlertModal(error.data.statusText);
        });
    } else {
      const taskId = selectedItem.taskId;
      await TasksApi.editTask({
        inputTask,
        inputAssignTo,
        taskId
      })
        .promise.then(async result => {
          const tasks = result.data.tasks;

          this.setState({ actionLoading: false, tasks, inputTask: null, inputAssignTo: null, selectedItem: null });

          this.onPressClose();

          actions.setAlert('Your task has changed.');
          return;
        })
        .catch(error => {
          console.log('tasks error', error);
          this.setState({ actionLoading: false });
          actions.setAlertModal(error.data.statusText);
        });
    }
  };

  onPressToggleSelect = () => {
    this.selectRef.togglePicker(true);
  };

  onModalHide = () => {
    const { actions } = this.props;

    setTimeout(() => {
      actions.clearAlertModal();
      actions.clearAlert();
    }, 4000);
  };

  render() {
    const { isModalOpen, onPressCloseButton } = this.props;
    const { people, inputTask, inputAssignTo, modalTitle, buttonLabel, actionLoading } = this.state;

    return (
      <Modal
        onModalHide={() => {
          this.onModalHide();
        }}
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isModalOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={this.onPressClose}>
        <AlertModal />
        <KeyboardAvoidingView enabled behavior={Platform.OS === 'android' ? undefined : 'position'}>
          <View style={[styles.modalContent, { height: 250 }]}>
            {onPressCloseButton ? (
              <TouchableOpacity activeOpacity={0.8} onPress={this.onPressClose} style={styles.closeContainer}>
                <Image style={styles.close} source={images.close} resizeMode="cover" />
              </TouchableOpacity>
            ) : null}
            <AppText textWeight="600" style={styles.titleText}>
              {modalTitle}
            </AppText>
            <View style={styles.contentContainer}>
              <InputWithLabel
                containerStyle={[FormStyles.inputContainer, FormStyles.inputContainerLabel]}
                style={FormStyles.inputStyle}
                autoCorrect={false}
                autoFocus={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                maxLength={128}
                numberOfLines={1}
                returnKeyType="next"
                placeholder="Task"
                value={inputTask}
                onChangeText={text => this.setState({ inputTask: text })}
                onSubmitEditing={this.onPressToggleSelect}
              />
              <InputWithLabel
                onRef={ref => {
                  this.selectRef = ref;
                }}
                select
                selectPlaceholder="Assign to"
                outerContainer={{ width: width - 83 }}
                items={people}
                selectValue={inputAssignTo}
                containerStyle={[FormStyles.inputSelect, FormStyles.inputContainerLabel]}
                style={FormStyles.inputStyle}
                autoCorrect={false}
                autoFocus={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                maxLength={2}
                numberOfLines={1}
                returnKeyType="next"
                onDonePress={this.onPressToggleSelect}
                onValueChange={text => this.setState({ inputAssignTo: text })}
              />
            </View>
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onSubmit}
                isLoading={actionLoading}
                containerStyle={[FormStyles.buttonHalf, { width: 140 }]}>
                <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={styles.buttonText}>
                  {buttonLabel}
                </AppText>
              </ButtonLoading>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDischargeAddEditModal);
