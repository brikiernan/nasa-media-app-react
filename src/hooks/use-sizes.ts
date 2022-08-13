import { useEffect, useState } from 'react';

import { Sizes } from 'types';

export const useSizes = (params: Sizes) => {
  const [small, setSmall] = useState('');
  const [medium, setMedium] = useState('');
  const [large, setLarge] = useState('');
  const [original, setOriginal] = useState('');

  useEffect(() => {
    const small = new Image();
    small.addEventListener('load', () => {
      const fileType = params.small?.split('.').pop();
      setSmall(
        `Small (${small.naturalWidth} x ${small.naturalHeight}) ~ .${fileType}`
      );
    });
    small.src = params.small || '';

    const medium = new Image();
    medium.addEventListener('load', () => {
      const fileType = params.medium?.split('.').pop();
      setMedium(
        `Medium (${medium.naturalWidth} x ${medium.naturalHeight}) ~ .${fileType}`
      );
    });
    medium.src = params.medium || '';

    const large = new Image();
    large.addEventListener('load', () => {
      const fileType = params.large?.split('.').pop();
      setLarge(
        `Large (${large.naturalWidth} x ${large.naturalHeight}) ~ .${fileType}`
      );
    });
    large.src = params.large || '';

    const original = new Image();
    original.addEventListener('load', () => {
      const fileType = params.original?.split('.').pop();
      setOriginal(
        `Original (${original.naturalWidth} x ${original.naturalHeight}) ~ .${fileType}`
      );
    });
    original.src = params.original || '';
  }, [params]);

  return { small, medium, large, original };
};
