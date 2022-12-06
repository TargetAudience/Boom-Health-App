const baseUrl = 'https://api.boom.health';
const folder = 'v1.0.8';

export const appId = (global.__DEV__ ? '' : '1514706662');
export const mixPanelToken = (global.__DEV__ ? '6f4e04514d4443f93dee5ec7bc035e5a' : '3ac0b75c4845632cc95674f05b826e76');

export const apiUrl = `${baseUrl}/${folder}`;
export const assetsUrl = `${baseUrl}/assets/`;
export const photosUrl = `${baseUrl}/${folder}/uploads/`;
export const profilePhotosUrl = `${photosUrl}profile/`;
export const documentsUrl = `${assetsUrl}documents/`;
export const documentsLibUrl = `${assetsUrl}documentslib/`;

export const version = '0.0.62';
export const appVersion = 62;

// development or production
export const pushEnvironment = 'production';

/*
const baseUrl = 'http://boomhealth-api:8888';
const folder = 'v1.0.1';
const baseUrl = 'http://192.168.0.100:8888/boomhealth-api';
const folder = 'v1.0.1';
const baseUrl = 'https://api.boom.health';
const folder = 'v1.0.8';
*/

/*
RELEASES:
=======
Sun Jun 12, 2021
Version 52
v1.0.6
=======
Thurs June 16 2021
Version 54
v1.0.6
Added Push Notifications
=======
Sun June 19 2021
Version 55
v1.0.6
Updated OneSignal Library; Changed Settings Push Notifications.
=======
Sun June 26 2021
Version 56
v1.0.6
Added Firebase Library; Changed Settings Push Notifications.
Android and iOS build.
=======
Sun July 17
Only TestFlight for pen testing
v1.0.6test
=======
Sun Aug 16
New actionsheet and security chanages
v1.0.7
Version 58
=======
Sun Nov 20
New caregivers and discharge tasks
v1.0.8
Version 50
=======
Sun Dec 4
Android
Upgraded to RN 7
v1.0.8
Version 51
=======
*/
