
  async getSpaces(auth) {
    return new Promise(async (resolve, reject) => {
      const getMyMemberships = await this.getMemberships({userId: auth.userId, role: auth.role});

      // console.debug('getSpaces getMyMemberships', getMyMemberships);

      if (getMyMemberships.statusCode === 404 || getMyMemberships.response?.data?.length === 0) {
        resolve({foundChats: false});
      }
      if (getMyMemberships.statusCode === 200 && getMyMemberships.response?.data?.length > 0) {
        const chats = [];
        for (var membership of getMyMemberships.response.data) {

          console.debug('getSpaces membership', membership);

          const getSpace = await this.getSpace({ spaceId: membership.id });
          if (getSpace.statusCode === 404) {
            resolve({foundChats: false});
          }
          const room = [];
          if (getSpace.statusCode === 200 && getSpace.response?.data?.length > 0) {
            for (var space of getSpace.response.data) {
              console.debug('getSpaces space', space);
            }
          }
        }
        resolve({foundChats: false});
      }
    });
  }

  getChannelsServer = data => {
    return new Promise((resolve, reject) => {
      this.pubnub.getChannels({ userId: data.userId }, function(status, response) {
        resolve({statusCode: status.statusCode, response, status});
      });
    });
  }



  getChannelsServer = data => {
    return new Promise((resolve, reject) => {
      this.pubnub.getMemberships({ userId: data.userId }, function(status, response) {
        resolve({statusCode: status.statusCode, response, status});
      });
    });
  }


  getSpace = spaceId => {
    return new Promise((resolve, reject) => {
      this.pubnub.getSpace({ spaceId },(status, response) => {
        resolve({statusCode: status.statusCode, response});
      });
    });
  }


  updateSingleSpace = data => {
    return new Promise((resolve, reject) => {
      this.pubnub.updateSpace({ id: data.channel, custom: data.custom },(status, response) => {
        resolve({statusCode: status.statusCode, response});
      });
    });
  }
