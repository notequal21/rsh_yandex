import Button from '../../components/Button/Button';
import style from './Final.module.scss';
import { checkSvg } from './assets/check';
import { warnSvg } from './assets/warn';
import socialLinks from './socialLinks';
// import bgImg from './assets/bg/bg.jpg';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useForm } from 'react-hook-form';
import checkSvgIcon from './assets/check.svg';
import { Transition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectAnswers,
  selectCalculatedValue,
  selectResult,
  selectStartTime,
  setCalculatedValue,
  setFinishTime,
} from '../../store/answersSlice';
import { finalResults } from './results';
import checkLink from './assets/check-link.svg';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts';
import axios from 'axios';
import { dateString } from '../../helpers/dateString';
import CountUp from 'react-countup';

interface IFinal {
  refItem: any;
  styleProps?: any;
}

const Final = ({ refItem, styleProps }: IFinal) => {
  const nodeRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isSocialShared, setIsSocialShared] = useState(false);
  const [isFormSended, setIsFormSended] = useState(false);
  const [successEmail, setSuccessEmail] = useState(false);
  const emailRegex = /^\S+@\S+\.\S+$/;
  const calculatedValue: any = useAppSelector(selectCalculatedValue);
  const dispatch = useAppDispatch();
  const resultArr = useAppSelector(selectResult);
  const [bgLink, setBgLink] = useState('');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const isMobile = useMediaQuery('(max-width:720px)');
  const [sharedLink, setSharedLink]: any = useState([]);
  const [currentResultStorage, setCurrentResultStorage]: any = useLocalStorage(
    'currentResult',
    {}
  );
  const [isFinalWasOpened, setIsFinalWasOpened] = useLocalStorage(
    'isFinalPageOpened',
    false
  );
  const answersStore = useAppSelector(selectAnswers);
  const startTime = useAppSelector(selectStartTime);
  const [sharedLinksStorage, setSharedLinksStorage]: any = useLocalStorage(
    'sharedLinks',
    []
  );
  const [startTimeStorage, setStartTimeStorage]: any = useLocalStorage(
    'startTime',
    ''
  );
  const [answersStorage, setAnswersStorage]: any = useLocalStorage(
    'answers',
    []
  );
  const [finalResultId, setFinalResultId]: any = useLocalStorage('answers', []);
  const [showWarn, setShowWarn] = useState(false);
  const [sendErr, setSendErr] = useState('');
  const [sendAwait, setSendAwait] = useState(false);
  const [isFormWasDecline, setIsFormWasDecline] = useState(false);
  const [isFinished, setIsFinished] = useState(window.actionFinished);

  const IsJsonString = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const onSubmit = (data: any) => {
    if (sharedLink.length > 0) {
      setSendAwait(true);

      // console.log(answersStore, answersStorage);

      axios
        .post(window.yarshEndPoint, {
          email: data.email,
          start: startTimeStorage ? startTimeStorage : startTime,
          finish: dateString(),
          answers: answersStore.length > 0 ? answersStore : answersStorage,
          result: calculatedValue,
          socials: sharedLink,
        })
        .then(function (response) {
          // console.log(response);
          // const isJson = IsJsonString(response.data);
          const isOk = response.data.result;

          if (isOk) {
            setIsFormSended(true);
            dispatch(setFinishTime(dateString()));

            setIsFinalWasOpened(false);
            setCurrentResultStorage({});
            setSharedLinksStorage([]);
            setStartTimeStorage('');
            setSendErr('');
            window.yarshGoal('finish');
          } else {
            setSendErr('Системная ошибка');
          }
        })
        .catch(function (error) {
          error.response.data.error
            ? setSendErr(error.response.data.error)
            : setSendErr(error.message);
        })
        .finally(() => {
          setSendAwait(false);
          setIsFormWasDecline(true);
          setIsFinalWasOpened(false);
          // setCurrentResultStorage({});
          // setSharedLinksStorage([]);
          // setStartTimeStorage('');
          // setSendErr('');
        });
    } else {
      setShowWarn(true);
    }
  };

  const calculateValue = () => {
    const n = 10;
    const v = resultArr[1];
    const p = resultArr[2];
    const q = resultArr[3];

    const value = ((n - v - p) * q * 2) / 10;

    if (value === 2) {
      dispatch(setCalculatedValue(2.4));
    } else {
      dispatch(setCalculatedValue(((n - v - p) * q * 2) / 10));
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (emailRegex.test(value.email)) {
        setSuccessEmail(true);
      } else {
        setSuccessEmail(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!isFormSended && !isFormWasDecline) {
      if (isFinalWasOpened) {
        setSharedLink(sharedLinksStorage);
        setBgLink(
          `./img/result-bg/${
            isMobile ? currentResultStorage?.bg[1] : currentResultStorage?.bg[0]
          }`
        );
        setText1(currentResultStorage?.text[0]);
        setText2(currentResultStorage?.text[1]);
        dispatch(setCalculatedValue(currentResultStorage?.value));
      } else {
        calculateValue();

        const currentResult: any = finalResults.filter(
          (item) => item.value === calculatedValue
        )[0];

        setAnswersStorage(answersStore);
        setCurrentResultStorage(currentResult);
        setIsFinalWasOpened(true);
        setStartTimeStorage(startTime);

        currentResult?.bg &&
          setBgLink(
            `./img/result-bg/${
              isMobile ? currentResult?.bg[1] : currentResult?.bg[0]
            }`
          );
        currentResult?.text[0] && setText1(currentResult?.text[0]);
        currentResult?.text[1] && setText2(currentResult?.text[1]);
      }
    }
  });

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(bgRef.current, { opacity: 0, duration: 1 });
      tl.from(contentRef.current, { x: '105%', opacity: 0, duration: 1 }, 0.5);
      tl.from(
        lineRef.current,
        {
          opacity: 0,
          rotate: '-90deg',
          duration: 5,
          ease: 'elastic',
        },
        1.2
      );
    }, refItem);

    return () => ctx.revert();
  }, []);

  const setShared = (id: string) => {
    window.yarshGoal('share', id);
    setTimeout(() => {
      setSharedLink([...sharedLink, id]);
      setSharedLinksStorage([...sharedLink, id]);
      !isSocialShared && setIsSocialShared(true);
    }, 2000);
  };

  return (
    <section ref={refItem} style={styleProps} className={style.final}>
      <div ref={bgRef} className={style.final__bg}>
        <img src={bgLink} alt='' />
      </div>

      <div ref={contentRef} className={`${style.finalContent} container`}>
        <div className={style.finalInfo}>
          {isMobile && (
            <div className={style.finalInfo__img}>
              <img src={bgLink} alt='' />

              <div className={style.finalInfo__count}>
                <CountUp
                  start={0}
                  duration={4}
                  end={calculatedValue}
                  decimal=','
                  decimals={1}
                  delay={1.2}
                />
                {/* {calculatedValue.toLocaleString()} */}
                <span className={style.line} ref={lineRef}></span>
              </div>
            </div>
          )}

          {!isMobile && (
            <>
              <div className={style.finalInfo__count}>
                <CountUp
                  start={0}
                  duration={4}
                  end={calculatedValue}
                  decimal=','
                  decimals={1}
                  delay={1.2}
                />
                {/* {calculatedValue.toLocaleString()} */}
                <span className={style.line} ref={lineRef}></span>
              </div>
            </>
          )}
          <div className={style.finalInfo__title}>Ваш результат:</div>
          <div className={style.finalInfo__text}>
            Если заправляться через Яндекс Заправки, вы могли бы сэкономить
            <span> {text1},</span> за это время у вас получилось бы наконец{' '}
            <span> {text2}.</span>
            <span></span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${style.finalForm} ${
            isFinished && style.isFinishedContent
          }`}
        >
          <div
            className={`${style.successModal}  ${isFinished && style.sended}`}
          >
            <div className={style.successModal__check}>
              <img src={checkSvgIcon} alt='' />
            </div>
            <div className={style.successModal__title}>Акция завершена!</div>
            <div className={style.successModal__text}>
              <p>
                Об итогах можно узнать в 
                <a
                  href='https://vk.com/rosfines'
                  rel='noreferrer'
                  target='_blank'
                >
                  группе РосШтрафы
                </a>{' '}
                во Вконтакте.
              </p>
              <p>
                Скачайте{' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={`${
                    isMobile
                      ? 'https://redirect.appmetrica.yandex.com/serve/604797553023702938'
                      : 'https://zapravki.yandex.ru/?utm_source=rosfines&utm_medium=partner'
                  }`}
                >
                  Яндекс Заправки
                </a>{' '}
                и начните экономить время.
              </p>
            </div>
          </div>

          {!isFinished && (
            <>
              <div
                className={`${style.successModal} ${
                  style.successModal_finished
                } ${isFormSended && style.sended}`}
              >
                <div className={style.successModal__check}>
                  <img src={checkSvgIcon} alt='' />
                </div>
                <div className={style.successModal__title}>Спасибо!</div>
                <div className={style.successModal__subtitle}>
                  Теперь вы участвуете <br /> в розыгрыше!
                </div>
              </div>
              <div className={style.finalForm__title}>
                Выиграйте запас топлива от Яндекс Заправок!
              </div>
              <div className={style.finalShare}>
                <div className={style.finalShare__title}>
                  1. Поделитесь результатом с друзьями:
                </div>
                <div className={style.finalShare__socials}>
                  {socialLinks.map((item: any, index: any) => (
                    <a
                      rel='noreferrer'
                      target='_blank'
                      href={`${item.link}_${
                        currentResultStorage && currentResultStorage.id
                      }`}
                      key={index}
                      className={`${style.finalShare__socialsItem} ${
                        sharedLink.some((link: any) => link === item.sn) &&
                        style.shared
                      }`}
                      onClick={() => setShared(item.sn)}
                    >
                      {item.icon}

                      <span>
                        <img src={checkLink} alt='' />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <div className={style.finalEmail}>
                <div className={style.finalEmail__title}>
                  2. Оставьте свой контактный email:
                </div>
                <label
                  className={`${style.finalEmail__input} ${
                    errors.email && style.err
                  } ${successEmail && style.success}`}
                >
                  <input
                    {...register('email', {
                      required: true,
                      pattern: emailRegex,
                    })}
                    type='text'
                    placeholder='Введите email'
                  />
                </label>
              </div>
              <div
                className={`${style.finalCheck} ${errors.agree && style.err}`}
              >
                <label>
                  <input
                    {...register('agree', { required: true })}
                    type='checkbox'
                  />
                  <span>{checkSvg}</span>
                  <p>
                    Соглашаюсь с{' '}
                    <a
                      href='/rules/'
                      target='_blank'
                      onClick={() => window.yarshGoal('rules')}
                    >
                      правилами акции
                    </a>{' '}
                    и даю согласие на обработку персональных данных. Подробнее
                    об обработке данных{' '}
                    <a
                      target='_blank'
                      rel='noreferrer'
                      href='https://rosfines.ru/politics_personal_data'
                    >
                      здесь
                    </a>
                    .
                  </p>
                </label>
              </div>
              <div className={style.finalAgree}>
                <p>
                  Нажимая на кнопку, я соглашаюсь на получение рекламной
                  рассылки.
                </p>
              </div>

              {sharedLink.length === 0 && showWarn && (
                <div className={style.final__warn}>
                  {warnSvg}
                  {isMobile
                    ? 'Пожалуйста, поделитесь результатом в соцсетях'
                    : 'Пожалуйста, сначала поделитесь результатом в соцсетях'}
                </div>
              )}

              {errors.agree && (
                <div className={style.final__warn}>
                  {warnSvg} Необходимо согласие
                </div>
              )}

              {sendErr.length > 0 && (
                <div className={style.final__warn}>
                  {warnSvg}
                  {sendErr}
                </div>
              )}

              <Button
                loading={sendAwait}
                type={'submit'}
                className={style.final__button}
                title='Участвовать'
              />
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Final;
