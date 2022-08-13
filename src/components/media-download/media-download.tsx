import { Fragment, useState } from 'react';
import {
  RuxButton,
  RuxMenu,
  RuxMenuItem,
  RuxPopUpMenu,
} from '@astrouxds/react';

import { Sizes } from 'types';
import { useSizes } from 'hooks';
import './media-download.css';

type MediaDownloadProps = Sizes & {
  href: string | null;
};

export const MediaDownload: React.FC<MediaDownloadProps> = props => {
  const { href, ...sizeAssets } = props;
  const { large, medium, original, small } = sizeAssets;
  const sizes = useSizes(sizeAssets);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleDownload = (event: any) => {
    window.open(event.target.value, '_blank');
    onClose();
  };

  type Item = {
    href: string | null;
    label: string;
    title: string;
  };

  const items: Item[] = [
    {
      href: small,
      label: sizes.small,
      title: `Small ~ .${href?.split('.').pop()}`,
    },
    {
      href: medium,
      label: sizes.medium,
      title: `Medium ~ .${href?.split('.').pop()}`,
    },
    {
      href: large,
      label: sizes.large,
      title: `Large ~ .${href?.split('.').pop()}`,
    },
    {
      href: original,
      label: sizes.original,
      title: `Original ~ .${href?.split('.').pop()}`,
    },
  ];

  return (
    <div id='media-download'>
      <RuxPopUpMenu open={isOpen}>
        <RuxButton onClick={onOpen} icon='expand-more' slot='trigger' secondary>
          DOWNLOAD
        </RuxButton>
        <RuxMenu>
          {items.map(({ href, label, title }, i) => (
            <Fragment key={href || i}>
              {href && (
                <RuxMenuItem
                  onRuxmenuitemselected={handleDownload}
                  value={href}
                >
                  {label || title}
                </RuxMenuItem>
              )}
            </Fragment>
          ))}
        </RuxMenu>
      </RuxPopUpMenu>
    </div>
  );
};
