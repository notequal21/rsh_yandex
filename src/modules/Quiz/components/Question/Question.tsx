import style from './Question.module.scss';
import { useRef, useLayoutEffect, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  selectBackSlide,
  selectResult,
  setAnswerById,
  setAnswerByIdBtn,
  setBackSlide,
} from '../../../../store/answersSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'usehooks-ts';

interface IQuestion {
  img: any;
  title: string;
  answers: any;
  handle: () => void;
  refItem: any;
  styleProps?: any;
  refContent?: any;
  refImg?: any;
  refGradient?: any;
  questionId: number;
}

const Question = ({
  img,
  title,
  answers,
  handle,
  refItem,
  styleProps,
  refContent,
  refImg,
  refGradient,
  questionId,
}: IQuestion) => {
  const dispatch = useAppDispatch();
  const answersResult = useAppSelector(selectResult);
  const isMobile = useMediaQuery('(max-width:720px)');
  const isBackSlide = useAppSelector(selectBackSlide);

  const selectAnswer = useCallback((value: number, btnID: number) => {
    dispatch(setAnswerById({ id: questionId, value }));
    dispatch(setAnswerByIdBtn({ id: questionId, value: btnID }));

    window.yarshGoal('answer', questionId, btnID);

    gsap.to(nodeRef.current, {
      opacity: 1,
      x: '-150%',
      duration: 0.4,
    });

    setTimeout(() => {
      handle();
    }, 300);
  }, []);

  const nodeRef = useRef(null);
  const questionContentRef = useRef(null);
  const questionImgRef = useRef(null);
  const questionGradientRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (!isBackSlide) {
        tl.from(
          questionContentRef.current,
          { opacity: 0, x: '100%', duration: 0.8 },
          0.3
        );
        if (!isMobile) {
          tl.from(
            questionImgRef.current,
            { opacity: 0, y: '100%', duration: 0.7 },
            0.7
          );
          tl.from(
            questionGradientRef.current,
            { opacity: 0, y: '100%', duration: 0.7 },
            0.8
          );
        } else {
          tl.from(
            questionGradientRef.current,
            { opacity: 0, x: '100%', duration: 0.7 },
            0.3
          );
        }
      } else {
        if (!isMobile) {
          tl.from(
            questionContentRef.current,
            { opacity: 0, x: '0', duration: 1.2 },
            0.2
          );
          tl.from(
            questionImgRef.current,
            { opacity: 0, y: '100%', duration: 0.7 },
            0.5
          );
          tl.from(
            questionGradientRef.current,
            { opacity: 0, y: '100%', duration: 0.7 },
            0.6
          );
        } else {
          tl.from(
            questionContentRef.current,
            { opacity: 0, x: '0', duration: 1.2 },
            0.2
          );
          tl.from(
            questionImgRef.current,
            { opacity: 0, y: '', duration: 0.7 },
            0.2
          );
          tl.from(
            questionGradientRef.current,
            { opacity: 0, y: '', duration: 0.7 },
            0.3
          );
        }
      }
    }, nodeRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    dispatch(setBackSlide(false));
  }, []);

  if (isMobile) {
    return (
      <div ref={nodeRef} style={styleProps} className={style.question}>
        <div className={style.questionContent__title}>{title}</div>

        <div ref={questionGradientRef} className={style.question__gradient}>
          <div ref={questionImgRef} className={style.question__img}>
            <img
              src={`./img/question-icons/mobile/quest-image-${img + 1}-mob.png`}
              alt=''
            />
          </div>
        </div>

        <div ref={questionContentRef} className={style.questionContent}>
          <div className={style.questionContent__answers}>
            {answers.map((item: any, index: any) => (
              <button
                key={index}
                onClick={() => selectAnswer(item.value, index + 1)}
                className={`${style.questionContent__answersItem} ${
                  answersResult[questionId] === item.value && style.selected
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div ref={nodeRef} style={styleProps} className={style.question}>
        <div ref={questionImgRef} className={style.question__img}>
          {/* <img src={img} alt='' />
           */}
          <img src={`./img/question-icons/quest-image-${img + 1}.png`} alt='' />
        </div>
        <div
          ref={questionGradientRef}
          className={style.question__gradient}
        ></div>

        <div ref={questionContentRef} className={style.questionContent}>
          <div className={style.questionContent__title}>{title}</div>
          <div className={style.questionContent__answers}>
            {answers.map((item: any, index: any) => (
              <button
                key={index}
                onClick={() => selectAnswer(item.value, index + 1)}
                className={`${style.questionContent__answersItem} ${
                  answersResult[questionId] === item.value && style.selected
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Question;
