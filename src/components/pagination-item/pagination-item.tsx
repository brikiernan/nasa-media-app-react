import { RuxButton } from '@astrouxds/react';

export type PaginationItemProps = {
  disabled: boolean;
  isSelected: boolean;
  onClick: (e: any) => void;
  page: number;
  type: string;
  children?: any;
};

export const PaginationItem: React.FC<PaginationItemProps> = props => {
  const { children, type, page, isSelected, ...rest } = props;

  const btnProps = {
    borderless: true,
    size: 'small' as 'small',
    ...rest,
  };

  switch (type) {
    case 'first':
      return children ? (
        <RuxButton {...btnProps}>
          {{ ...children, props: { ...children.props, children: '|< First' } }}
        </RuxButton>
      ) : (
        <RuxButton {...btnProps}>{'|< First'}</RuxButton>
      );

    case 'previous':
      return children ? (
        <RuxButton {...btnProps}>
          {{ ...children, props: { ...children.props, children: '< Prev' } }}
        </RuxButton>
      ) : (
        <RuxButton {...btnProps}>{'< Prev'}</RuxButton>
      );

    case 'start-ellipsis':
      return <span className='ellipsis'>{'...'}</span>;

    case 'page':
      return (
        <RuxButton
          className={isSelected ? 'white' : ''}
          {...btnProps}
          disabled={isSelected}
        >
          {children || page}
        </RuxButton>
      );

    case 'end-ellipsis':
      return <span className='ellipsis'>{'...'}</span>;

    case 'next':
      return children ? (
        <RuxButton {...btnProps}>
          {{ ...children, props: { ...children.props, children: 'Next >' } }}
        </RuxButton>
      ) : (
        <RuxButton {...btnProps}>{'Next >'}</RuxButton>
      );

    case 'last':
      return children ? (
        <RuxButton {...btnProps}>
          {{ ...children, props: { ...children.props, children: 'Last >|' } }}
        </RuxButton>
      ) : (
        <RuxButton {...btnProps}>{'Last >|'}</RuxButton>
      );

    default:
      throw new Error(`Unhandled pagination item type ${type}`);
  }
};
