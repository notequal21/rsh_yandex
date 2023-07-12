import style from './Quiz.module.scss';
import Pagination from './components/Pagination/Pagination';
import { useState, useRef, useLayoutEffect } from 'react';
import Question from './components/Question/Question';
import { questions } from './questions';
import { Transition } from 'react-transition-group';
import { gsap } from 'gsap';

import bgElemLeft from './assets/left-elem.png';
import bgElemRight from './assets/right-elem.png';
import bgElemRightMobile from './assets/right-elem-mobile.png';
import { useMediaQuery } from 'usehooks-ts';
import { useAppDispatch } from '../../store/hooks';
import { setBackSlide } from '../../store/answersSlice';

interface IQuiz {
  refItem?: any;
  styleProps?: any;
  handler?: () => void;
  handleFinal: () => void;
}

const duration = 0;

const defaultStyle = {
  opacity: 1,
};
const transitionStyles: any = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 1 },
};

const Quiz = ({ refItem, styleProps, handler, handleFinal }: IQuiz) => {
  const nodeRef = useRef(null);
  const bgElem = useRef(null);
  const paginationRef = useRef(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const isMobile = useMediaQuery('(max-width:720px)');
  const dispatch = useAppDispatch();

  const nextQuestion = () => {
    if (activeQuestion === 3) {
      handleFinal();
    } else {
      setActiveQuestion(activeQuestion + 1);
    }
  };

  const backQuestion = () => {
    dispatch(setBackSlide(true));
    setActiveQuestion(activeQuestion - 1);
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(refItem.current, { opacity: 0, duration: 2.5 });
      tl.from(bgElem.current, { opacity: 0, duration: 2.5 }, 0.1);
      tl.from(paginationRef.current, { opacity: 0, duration: 1 }, 1.3);
    }, refItem);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={refItem} style={styleProps} className={style.quiz}>
      <div ref={bgElem} className={style.quizBg}>
        <div className={style.quizBg__elem}>
          <img src={bgElemLeft} alt='' />
        </div>
        <div className={style.quizBg__elem}>
          <img src={isMobile ? bgElemRightMobile : bgElemRight} alt='' />
        </div>
      </div>

      {isMobile && (
        <Pagination
          refItem={paginationRef}
          activeIndex={activeQuestion}
          handler={backQuestion}
        />
      )}

      <div className={style.quizContent}>
        {questions.map((item, index) => (
          <Transition
            nodeRef={nodeRef}
            in={activeQuestion === index}
            timeout={duration}
            unmountOnExit={true}
            key={index}
          >
            {(state) => (
              <Question
                title={item.title}
                // img={item.img}
                img={index}
                answers={item.answers}
                key={index}
                handle={nextQuestion}
                refItem={nodeRef}
                questionId={index}
                styleProps={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              />
            )}
          </Transition>
        ))}
      </div>

      {!isMobile && (
        <Pagination
          refItem={paginationRef}
          activeIndex={activeQuestion}
          handler={backQuestion}
        />
      )}
    </section>
  );
};

export default Quiz;
