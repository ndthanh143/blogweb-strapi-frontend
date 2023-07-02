import useBoolean from '@/hooks/useBoolean';
import { useEffect } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import cx from 'classnames';

export function ScrollTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { value, setTrue, setFalse } = useBoolean();

  useEffect(() => {
    const handleToggleScroll = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) setTrue();
      else setFalse();
    };

    window.addEventListener('scroll', handleToggleScroll);

    return () => window.removeEventListener('scroll', handleToggleScroll);
  });
  return (
    <div
      className={cx(
        'p-3 rounded-full bg-color-primary fixed right-4 lg:right-8 cursor-pointer transition-all duration-200 hover:bg-color-primary-hover text-color-bold z-20',
        value ? 'lg:bottom-20 bottom-14 opacity-100' : 'bottom-4 opacity-0',
      )}
      onClick={scrollToTop}
    >
      <AiOutlineArrowUp />
    </div>
  );
}
