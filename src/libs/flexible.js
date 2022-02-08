const onResize = () => {
  const _baseFontSize = 37.5;
  const ua = navigator.userAgent;
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  let dpr = window.devicePixelRatio || 1;
  if (!isIos && !(matches && matches[1] > 534)) {
    // 如果非iOS, 非Android4.3以上, dpr设为1;
    dpr = 1;
  }
  const scale = 1 / dpr;
  // const scale = 1
  let metaEl = document.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    window.document.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
  document.documentElement.style.fontSize = _baseFontSize * document.documentElement.clientWidth / 375 + 'px';
}

onResize()
window.addEventListener('resize', () => onResize())



// const baseSize = 37.5;

// const setRem = () => {
//   console.log('--------log--------', 55)
//   const scale = document.documentElement.clientWidth / 375;
//   // fontSize: Math.min(scale, 2)
//   document.documentElement.style.fontSize = `${baseSize * Math.min(scale, 2)}px`;
// };

// setRem();

// window.onresize = () => setRem();
