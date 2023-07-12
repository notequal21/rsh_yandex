import style from './Pagination.module.scss';

import arrowBackSvg from './assets/arrowBack';
import arrowNextSvg from './assets/arrow-next.svg';

interface IPagination {
  handler?: () => void;
  activeIndex?: number;
  refItem?: any;
}

const Pagination = ({ handler, activeIndex, refItem }: IPagination) => {
  return (
    <div ref={refItem} className={style.pagination}>
      <div
        onClick={handler}
        className={`${style.pagination__btn} ${
          activeIndex === 0 && style.hidden
        }`}
      >
        {arrowBackSvg}
      </div>
      <div className={style.paginationList}>
        {[0, 1, 2, 3].map((item, index): any => (
          <div
            key={index}
            className={`${style.paginationList__item} ${
              activeIndex === index && style.active
            }`}
          >
            <span>{item + 1}</span>
          </div>
        ))}
        {/* <div className={style.paginationList__item}>2</div>
        <div className={style.paginationList__item}>3</div>
        <div className={style.paginationList__item}>4</div> */}
      </div>
      <div className={style.pagination__arrow}>
        <img src={arrowNextSvg} alt='' />
      </div>
    </div>
  );
};

export default Pagination;
