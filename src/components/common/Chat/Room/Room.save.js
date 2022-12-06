if (newChat) {
       console.debug('newChat newChat !!! ----------------->');

      this.setState({ newChatLoading: true });

      let otherPersonName = `${item.firstName} ${item.lastName}`;
      let myName = `${auth.firstName} ${auth.lastName}`;

      const getUserOtherPerson = await pubsub.getUser({userId: item.userId, role: item.role});
      if (getUserOtherPerson.statusCode === 404) {
        await pubsub.addUser({userId: item.userId, name: otherPersonName, firstName: item.firstName, lastName: item.lastName, role: item.role, thumb: item.thumb});
      }

      const getUserMyself = await pubsub.getUser({userId: auth.userId, role: auth.role});
      if (getUserMyself.statusCode === 404) {
        await pubsub.addUser({userId: auth.userId, name: myName, firstName: auth.firstName, lastName: auth.lastName, role: auth.role, thumb: auth.signedInPhoto});
      }

      try {
        const existingSpace = await pubsub.findExistingSpace(auth, item);
        console.debug('existingSpace', existingSpace)
        if (!existingSpace.exists) {
          try {
            const newSpace = await pubsub.createNewSpace(auth, item);
            pubsub.subscribe([newSpace.spaceId]);
            this.fetchMessages(newSpace.spaceId);
            this.setState({ channelName: newSpace.spaceId });

            console.debug('newChat newChat !!! newSpace', newSpace)


//  DELETE THIS?? WHAT IS THIS???
          try {
              const chats = await pubsub.getChats(auth);
              console.log('rooom before addChats', chats.chats)
              if (chats.foundChats) {
                actions.addChats(chats.chats);
              }
            } catch (error) {
              console.debug('error', error);
            }

            const message = 'S:' + item.userId + ':' + newSpace.spaceId;
            const sendSignal = await pubsub.sendSignal({ channel: 'signalChannel', message });
            console.debug('sendSignal', sendSignal);

//  PLEASE TEST:
            try {
              const hereNow = await pubsub.getHereNow(auth);
              if (hereNow.foundChannels) {
                for (let [key, value] of Object.entries(hereNow.hereNow)) {
                  if (value.occupants.length) {
                    for (var occupant of value.occupants) {
                      actions.addToHereNow(occupant.uuid);
                    }
                  }
                }
              }
            } catch (error) {
              console.debug('error', error);
            }
          } catch (error) {
            console.debug('error', error);
          }
        } else {
          // Room has already been created previously.
          pubsub.subscribe([existingSpace.spaceId]);
          this.fetchMessages(existingSpace.spaceId);
          this.setState({ channelName: existingSpace.spaceId });
        }
      } catch (error) {
        console.debug('error', error);
      }
    } else {
      // User is coming from the chat tab.
      this.fetchMessages(item.spaceId);
      this.setState({ channelName: item.spaceId });
    }