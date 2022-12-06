export const SlideData = 
[
  {
    id: 'Welcome',
    title: 'Welcome to Boom',
    text: 'Your one-stop app for home care',
    image: require('@assets/imagesAnim/girl.png'),
    blurBackground: false,
    animation: null
  },
  {
    id:'HomeCareNeeds',
    title: 'Instantly find and book your home care needs',
    text: 'Receive notifications for upcoming appointments',
    image: require('@assets/imagesAnim/phone-1.png'),
    blurBackground: false,
    animation: require('@assets/animations/HomeCareNeeds.Animation').Animation
  },
  {
    id:'InviteFamily',
    title: 'Invite your family',
    text: 'Family chat and manage home care together',
    image: require('@assets/imagesAnim/phone-2.png'),
    blurBackground: true,
    animation: require('@assets/animations/InviteFamily.Animation').Animation
  },
  {
    id:'ShareCost',
    title: 'Share the cost',
    text: 'With our split payment feature',
    image: require('@assets/imagesAnim/phone-3.png'),
    blurBackground: true,
    animation: require('@assets/animations/ShareCost.Animation').Animation
  },
]