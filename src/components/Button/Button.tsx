import style from './Button.module.scss';
import loader from './assets/loader.svg';

interface IButton {
  title: string;
  className?: string;
  refItem?: any;
  onClick?: () => void;
  type?: 'button' | 'submit';
  loading?: boolean;
}

const Button = ({
  title,
  className,
  refItem,
  onClick,
  type,
  loading,
}: IButton) => {
  return (
    <button
      disabled={loading}
      type={type ? type : 'button'}
      onClick={onClick}
      ref={refItem}
      className={`${style.btn} ${loading && style.isLoading} ${className}`}
    >
      {loading && (
        <div className={style.ldsDualRing}>
          <img src={loader} alt='' />
        </div>
      )}

      {title}
    </button>
  );
};

export default Button;
