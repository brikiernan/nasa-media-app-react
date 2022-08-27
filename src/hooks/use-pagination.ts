import { useEffect, useState } from 'react';

const range = (start: number, stop: number, step = 1) => {
  const length = (stop - start) / step + 1;
  return Array.from({ length }, (_, i) => start + i * step);
};

type OnClick = React.MouseEvent<HTMLButtonElement, MouseEvent>;

type HandleClickParams = {
  event: React.ChangeEvent<any>;
  value: number | null;
};

export type UsePaginationProps = {
  count?: number;
  disabled?: boolean;
  inner?: number;
  isShowFirst?: boolean;
  isShowLast?: boolean;
  isShowPrev?: boolean;
  isShowNext?: boolean;
  onChange?: (event: React.ChangeEvent<any>, page: number | null) => void;
  outter?: number;
  page?: number;
};

export const usePagination = ({ page, ...props }: UsePaginationProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState(page || 1);
  const {
    count = 1,
    disabled = false,
    inner = 1,
    isShowFirst = false,
    isShowLast = false,
    isShowNext = true,
    isShowPrev = true,
    onChange: handleChange,
    outter = 1,
  } = props;

  useEffect(() => {
    const startPages = range(1, Math.min(outter, count));
    const endPages = range(Math.max(count - outter + 1, outter + 1), count);

    const innerStart = Math.max(
      Math.min(
        // Natural start
        selectedPage - inner,
        // Lower boundary when page is high
        count - outter - inner * 2 - 1
      ),
      // Greater than startPages
      outter + 2
    );

    const innerEnd = Math.min(
      Math.max(
        // Natural end
        selectedPage + inner,
        // Upper boundary when page is low
        outter + inner * 2 + 2
      ),
      // Less than endPages
      endPages.length > 0 ? endPages[0] - 2 : count - 1
    );

    const itemList = [
      ...(isShowFirst ? ['first'] : []),
      ...(isShowPrev ? ['previous'] : []),
      ...startPages,

      ...(innerStart > outter + 2
        ? ['start-ellipsis']
        : outter + 1 < count - outter
        ? [outter + 1]
        : []),

      // Inner pages
      ...range(innerStart, innerEnd),

      ...(innerEnd < count - outter - 1
        ? ['end-ellipsis']
        : count - outter > outter
        ? [count - outter]
        : []),

      ...endPages,
      ...(isShowNext ? ['next'] : []),
      ...(isShowLast ? ['last'] : []),
    ];

    const handleClick = ({ event, value }: HandleClickParams) => {
      if (!!handleChange) handleChange(event, value);
      if (value) setSelectedPage(value);
    };

    const setPage = (type: string) => {
      switch (type) {
        case 'first':
          return 1;
        case 'previous':
          return selectedPage - 1;
        case 'next':
          return selectedPage + 1;
        case 'last':
          return count;
        default:
          return null;
      }
    };

    const items = itemList.map(item => {
      return typeof item === 'number'
        ? {
            type: 'page',
            page: item,
            isSelected: item === selectedPage,
            disabled,
            onClick: (event: OnClick) => {
              return handleClick({ event, value: item });
            },
          }
        : {
            type: item,
            page: setPage(item),
            isSelected: false,
            disabled:
              disabled ||
              (item.indexOf('ellipsis') === -1 &&
                (item === 'next' || item === 'last'
                  ? selectedPage >= count
                  : selectedPage <= 1)),
            onClick: (event: OnClick) => {
              return handleClick({ event, value: setPage(item) });
            },
          };
    });

    setItems(items);
  }, [
    count,
    disabled,
    handleChange,
    inner,
    isShowFirst,
    isShowLast,
    isShowNext,
    isShowPrev,
    outter,
    selectedPage,
  ]);

  return items;
};
