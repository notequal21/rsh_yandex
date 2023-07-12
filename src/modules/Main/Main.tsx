import Button from '../../components/Button/Button';
import style from './Main.module.scss';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMediaQuery } from 'usehooks-ts';

import greenLineImg from './assets/element.png';
import bgImg from './assets/image-back.jpg';
// import bgImg from './assets/bg.jpg';
// import bgImg2x from './assets/bg@2x.jpg';
import bgMobileImg from './assets/bg-mobile.png';
import bgMobileImg2x from './assets/bg-mobile@2x.png';
import carImg from './assets/car.png';

interface IMain {
  isActive?: boolean;
  isOut?: boolean;
  handler?: () => void;
  refItem?: any;
  styleProps?: any;
}

const Main = ({ isActive, isOut, handler, refItem, styleProps }: IMain) => {
  const bgRef = useRef(null);
  const greenLineRef = useRef(null);
  const carRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const listRef = useRef(null);
  const btnRef = useRef(null);

  const isTablet = useMediaQuery('(min-width: 720px) and (max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 720px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tlBg = gsap.timeline();
      const tlText = gsap.timeline();
      tlBg.from(bgRef.current, { opacity: 0, duration: 2.5 });
      tlBg.from(greenLineRef.current, { opacity: 0, duration: 2 }, 0.35);
      tlBg.from(
        carRef.current,
        { x: '-10rem', y: '-5rem', opacity: 0, duration: 1.5 },
        0
      );

      tlText.from(titleRef.current, { opacity: 0, y: '4rem', duration: 0.8 });
      tlText.from(
        subtitleRef.current,
        { opacity: 0, y: '4rem', duration: 0.8 },
        0.1
      );
      tlText.from(
        listRef.current,
        { opacity: 0, y: '4rem', duration: 0.8 },
        0.15
      );
      tlText.from(
        btnRef.current,
        { opacity: 0, y: '4rem', duration: 0.8 },
        0.2
      );
    }, refItem);

    return () => ctx.revert();
  }, []);

  return (
    <main
      className={`${style.main} ${isActive && style.active} ${
        !isOut && style.out
      }`}
      style={styleProps}
      ref={refItem}
    >
      <div className={style.main__line} ref={greenLineRef}>
        <img src={greenLineImg} alt='' />
      </div>
      <div className={style.mainBody__img}>
        <div className={style.mainBody__imgBg} ref={bgRef}>
          {isDesktop && <img src={bgImg} alt='' />}
          {isTablet && <img src={bgImg} alt='' />}
          {isMobile && (
            <img
              src={bgMobileImg}
              srcSet={`${bgMobileImg} 1x, ${bgMobileImg2x} 2x`}
              alt=''
            />
          )}
        </div>
        <div ref={carRef} className={style.mainBody__imgCar}>
          <img src={carImg} alt='' />
        </div>
      </div>
      <div className='container'>
        <div className={style.mainBody}>
          <div className={style.mainBody__text}>
            <h1 ref={titleRef}>Выиграйте годовой запас топлива!</h1>
            <h2 ref={subtitleRef}>
              Узнайте, сколько времени можно сэкономить с Яндекс Заправками,
              и выиграйте:
            </h2>
            <ul ref={listRef}>
              <li>60 000 руб. на заправку</li>
              <li>или один из 50 сертификатов на бензин на сумму 4 000 руб.</li>
            </ul>
            <Button onClick={handler} refItem={btnRef} title='Участвовать' />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
