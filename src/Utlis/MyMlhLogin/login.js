import { getFirebase } from 'react-redux-firebase';
import { siteVars, myMlhVars } from '../../config';

const makeUrl = () => {
  const { appId } = myMlhVars;
  const { websiteUrl } = siteVars;

  return `https://my.mlh.io/oauth/authorize?client_id=${appId}&redirect_uri=${websiteUrl}/_auth/mlh&response_type=code`;
};

const openPopUp = (name = '') => {
  const width = 500;
  const height = 600;
  const top = (window.screen.availHeight - height) / 2;
  const left = (window.screen.availWidth - width) / 2;
  const options = {
    width,
    height,
    top: top > 0 ? top : 0,
    left: left > 0 ? left : 0,
    location: true,
    resizable: true,
    statusbar: true,
    toolbar: false,
  };
  const optionsString = `width=${options.width},height=${options.height},top=${options.top},left=${options.left},location=${options.location},resizable=${options.resizable},statusbar=${options.statusbar},toolbar=${options.toolbar}`;
  const url = makeUrl();
  return window.open(url, name, optionsString);
};

const login = () => {
  // const firebase = getFirebase();
  window.addEventListener('message', (event) => {
    if (!event.data.myMlhCode) {
      // something from an unknown domain, let's ignore it
      return;
    }
    console.log('Message from', event.origin, event.data, event);
  });
  openPopUp('myMLH Login');
};

export default login;
