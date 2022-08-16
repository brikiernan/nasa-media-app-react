import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from 'providers';
import { Path } from 'lib/const';

const media_type = 'media_type';

const setInitial = (types: string[]) => ({
  images: types.includes('image'),
  videos: types.includes('video'),
  audio: types.includes('audio'),
});

export const useFilter = () => {
  const navigate = useNavigate();
  const [isMatch, setIsMatch] = useState(false);
  const { params, setSearch } = useAppContext();
  const types = params.media_type.split(',');
  const initialMediaTypes = useMemo(() => setInitial(types), [types]);
  const [mediaChecked, setMediaChecked] = useState(initialMediaTypes);

  useEffect(() => {
    const initial = JSON.stringify(initialMediaTypes);
    const updated = JSON.stringify(mediaChecked);
    const match = initial === updated;
    const checked = Object.values(mediaChecked).includes(true);
    setIsMatch(!checked || match);
  }, [mediaChecked, initialMediaTypes]);

  const handleClick = () => {
    const mediaTypes = [
      mediaChecked.images && 'image',
      mediaChecked.videos && 'video',
      mediaChecked.audio && 'audio',
    ].filter(type => type !== false);
    const urlParams = new URLSearchParams(params);
    urlParams.delete(media_type);
    const existing = urlParams.toString();
    const search = `${Path.search}?${existing}&${media_type}=${mediaTypes}`;
    navigate(search);
    setSearch(search);
  };

  const handleChange = (event: any) => {
    setMediaChecked(prev => ({
      ...prev,
      // @ts-ignore
      [event.target.id]: !prev[event.target.id],
    }));
  };

  return {
    handleChange,
    handleClick,
    isMatch,
    mediaChecked,
  };
};
