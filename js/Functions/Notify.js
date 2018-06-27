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
    timeout: Timeout || false,
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

function NotifyDone(Title, Message) {

  iziToast.show({
    id: 'Notify',
    title: Title,
    titleColor: '#3FC380',
    titleSize: '12px',
    message: Message || '',
    messageColor: 'white',
    messageSize: '10px',
    backgroundColor: 'grey',
    theme: 'dark', // dark
    color: 'white', // blue, red, green, yellow
    icon: 'fa fa-check',
    iconColor: '#3FC380',
    image: '',
    imageWidth: 50,
    maxWidth: '40%',
    layout: 2,
    close: true,
    position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    timeout: 2500,
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

function NotifyFailed(Title, Message) {

  iziToast.show({
    id: 'Notify',
    title: Title,
    titleColor: 'yellow',
    titleSize: '12px',
    message: Message || '',
    messageColor: 'white',
    messageSize: '10px',
    backgroundColor: 'grey',
    theme: 'dark', // dark
    color: 'white', // blue, red, green, yellow
    icon: 'fa fa-warning',
    iconColor: 'yellow',
    image: '',
    imageWidth: 50,
    maxWidth: '40%',
    layout: 2,
    close: true,
    position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    timeout: 3500,
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

function NotifyError(Title, Message) {

  iziToast.show({
    id: 'Notify',
    title: Title,
    titleColor: 'red',
    titleSize: '12px',
    message: Message || '',
    messageColor: 'white',
    messageSize: '10px',
    backgroundColor: 'grey',
    theme: 'dark', // dark
    color: 'white', // blue, red, green, yellow
    icon: 'fa fa-close',
    iconColor: 'red',
    image: '',
    imageWidth: 50,
    maxWidth: '40%',
    layout: 2,
    close: true,
    position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    timeout: false,
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
