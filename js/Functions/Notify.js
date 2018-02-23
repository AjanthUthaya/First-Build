function Notify(Title, TitleColor, Message, Icon, IconColor, Timeout) {

  iziToast.show({
    id: 'Notify',
    title: Title,
    titleColor: TitleColor || 'white',
    titleSize: '12px',
    message: Message || '',
    messageColor: 'white',
    messageSize: '10px',
    backgroundColor: 'grey',
    theme: 'dark', // dark
    color: 'white', // blue, red, green, yellow
    icon: Icon,
    iconColor: IconColor || 'white',
    image: '',
    imageWidth: 50,
    maxWidth: '40%',
    layout: 2,
    close: true,
    position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    timeout: Timeout,
    animateInside: false,
    progressBar: true,
    progressBarColor: 'white',
    progressBarEasing: 'linear',
    overlay: false,
    overlayClose: false,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    // bounceInLeft, bounceInRight, bounceInUp, bounceInDown, fadeIn, fadeInDown, fadeInUp, fadeInLeft, fadeInRight or flipInX.
    transitionIn: 'fadeInLeft',
    // fadeOut, fadeOutUp, fadeOutDown, fadeOutLeft, fadeOutRight, flipOutX
    transitionOut: 'fadeOutRight',
    transitionInMobile: 'fadeInLeft',
    transitionOutMobile: 'fadeOutRight'
  });

}
