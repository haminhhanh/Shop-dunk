import { useMount } from 'ahooks';
import { Keyboard, KeyboardEvent } from 'react-native';

interface IUseKeyboardHeight {
  onShow: (height: number) => void;
  onHide: () => void;
}

enum KeyboardEventNames {
  DID_SHOW = 'keyboardDidShow',
  DID_HIDE = 'keyboardDidHide',
}

const useKeyboardHeight = ({ onShow, onHide }: IUseKeyboardHeight) => {
  function onKeyboardDidShow(e: KeyboardEvent) {
    if (onShow) {
      onShow(e.endCoordinates.height);
    }
  }

  function onKeyboardDidHide() {
    if (onHide) {
      onHide();
    }
  }

  useMount(() => {
    let event_show = Keyboard.addListener(
      KeyboardEventNames.DID_SHOW,
      onKeyboardDidShow,
    );
    let event_hide = Keyboard.addListener(
      KeyboardEventNames.DID_HIDE,
      onKeyboardDidHide,
    );

    return () => {
      Keyboard.removeSubscription(event_show);
      Keyboard.removeSubscription(event_hide);
    };
  });

  return null;
};

export default useKeyboardHeight;
