import { isMobile } from 'react-device-detect';

const navigationInitialState = {
  drawer: {
    open: true,
  },
};

if (isMobile) {
  navigationInitialState.drawer.open = false;
}

export default navigationInitialState;
