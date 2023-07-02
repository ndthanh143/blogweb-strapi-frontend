import Image from 'next/image';
import { Popper } from '../Popper';
import useBoolean from '@/hooks/useBoolean';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export interface LanguageSwitcherProps {
  onChange: (lang: string) => void;
}

export default function LanguageSwitcher({ onChange }: LanguageSwitcherProps) {
  const { t } = useTranslation('header');
  const { value, setFalse, toggle } = useBoolean();

  const { locale } = useRouter();

  return (
    <div className="relative">
      <div className={cx('w-10 h-10 rounded-full overflow-hidden', !value && 'cursor-pointer')} onClick={toggle}>
        <Image
          src={locale === 'vi' ? '/vi.png' : '/eng.png'}
          width={50}
          height={50}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          alt={locale === 'vi' ? 'vietnamese' : 'english'}
          className="rounded-full"
        />
      </div>
      <Popper isOpen={value} onClose={setFalse} onItemClick={setFalse}>
        <div
          className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white px-4 py-2 cursor-pointer pr-12"
          onClick={() => onChange('vi')}
        >
          {t('langVie')}
          <span className="w-6 h-6 overflow-hidden rounded-full absolute right-3">
            <Image
              src="/vi.png"
              width={50}
              height={50}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              alt="vietnamese"
              className="rounded-full"
            />
          </span>
        </div>
        <div
          className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white pl-4 py-2 cursor-pointer pr-12"
          onClick={() => onChange('en')}
        >
          <div className="flex justify-between">
            {t('langEng')}
            <span className="w-6 h-6 overflow-hidden rounded-full flex-1 absolute right-3">
              <Image
                src="/eng.png"
                width={50}
                height={50}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                alt="english"
                className="rounded-full"
              />
            </span>
          </div>
        </div>
      </Popper>
    </div>
  );
}
