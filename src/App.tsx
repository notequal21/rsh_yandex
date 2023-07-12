import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './modules/Main/Main';
import { Transition } from 'react-transition-group';
import Quiz from './modules/Quiz/Quiz';
import Final from './modules/Final/Final';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  selectResult,
  setCalculatedValue,
  setStartTime,
} from './store/answersSlice';
import { useReadLocalStorage } from 'usehooks-ts';
import { dateString } from './helpers/dateString';

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
  opacity: 0,
  x: -100,
};

const transitionStyles: any = {
  entering: { opacity: 1, transform: 'translate( 0)' },
  entered: { opacity: 1, transform: 'translate( 0)' },
  exiting: { opacity: 0, transform: 'translate(-105%, 0)' },
  exited: { opacity: 0, transform: 'translate(-105%, 0)' },
};

declare global {
  interface Window {
    yarshEndPoint: any;
    yarshGoal: any;
  }
}

function App() {
  const nodeRef = useRef(null);
  const [isMainScreen, setMainScreen] = useState(true);
  const [isFinalScreen, setFinalScreen] = useState(false);
  const isFinalWasOpened = useReadLocalStorage('isFinalPageOpened');
  const dispatch = useAppDispatch();

  const handleMainScree = (type?: string) => {
    if (type === 'back') {
      setMainScreen(true);
    } else {
      setMainScreen(false);
      window.yarshGoal('start');

      dispatch(setStartTime(dateString()));
    }
  };

  const handleFinalScreen = (type?: string) => {
    setMainScreen(false);
    setFinalScreen(true);
  };

  useEffect(() => {
    // window.yarshEndPoint();
    if (isFinalWasOpened) {
      handleFinalScreen();
    }
  }, []);

  return (
    <div className='wrapper'>
      <div className='content'>
        <Header isFinalScreen={isFinalScreen} />

        {!isFinalWasOpened ? (
          <Transition
            nodeRef={nodeRef}
            in={isMainScreen && !isFinalScreen}
            timeout={duration}
            unmountOnExit={true}
          >
            {(state) => (
              <Main
                refItem={nodeRef}
                isOut={isMainScreen && !isFinalScreen}
                styleProps={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
                handler={handleMainScree}
              />
            )}
          </Transition>
        ) : (
          ''
        )}

        <Transition
          nodeRef={nodeRef}
          in={!isMainScreen && !isFinalScreen}
          timeout={0}
          unmountOnExit={true}
        >
          {(state) => (
            <Quiz handleFinal={handleFinalScreen} refItem={nodeRef} />
          )}
        </Transition>

        <Transition
          nodeRef={nodeRef}
          in={isFinalScreen}
          timeout={0}
          unmountOnExit={true}
        >
          {(state) => (
            <Final
              // styleProps={{
              //   ...defaultStyle,
              //   ...transitionStyles[state],
              // }}
              refItem={nodeRef}
            />
          )}
        </Transition>

        <Footer />
      </div>
    </div>
  );
}

export default App;
