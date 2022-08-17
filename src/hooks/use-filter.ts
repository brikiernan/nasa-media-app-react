import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from 'providers';
import { setSearchUrl } from 'lib/utils';

enum MediaType {
  audio = 'audio',
  image = 'image',
  video = 'video',
}

const setInitial = (types: string[]) => ({
  images: types.includes(MediaType.image),
  videos: types.includes(MediaType.video),
  audio: types.includes(MediaType.audio),
});

export const useFilter = () => {
  const navigate = useNavigate();
  const [showUpdate, setShowUpdate] = useState(false);
  const { params } = useAppContext();
  const types = params.media_type.split(',');
  const initialMediaTypes = useMemo(() => setInitial(types), [types]);
  const [mediaChecked, setMediaChecked] = useState(initialMediaTypes);
  const [initialYears] = useState({
    start: params.year_start,
    end: params.year_end,
  });

  useEffect(() => {
    const initialTypes = JSON.stringify(initialMediaTypes);
    const updatedTypes = JSON.stringify(mediaChecked);
    const isSameTypes = initialTypes === updatedTypes;
    const isStartMatch = params.year_start === initialYears.start;
    const isEndMatch = params.year_end === initialYears.end;
    const isUpdate = !isSameTypes || !isEndMatch || !isStartMatch;
    const hasACheck = Object.values(mediaChecked).includes(true);
    setShowUpdate(isUpdate && hasACheck);
  }, [initialMediaTypes, initialYears, mediaChecked, params]);

  const handleClick = () => {
    const mediaTypes = [
      mediaChecked.images && MediaType.image,
      mediaChecked.videos && MediaType.video,
      mediaChecked.audio && MediaType.audio,
    ].filter(type => type !== false);

    const search = setSearchUrl({
      ...params,
      media_type: mediaTypes.join(),
      page: '1',
    });

    navigate(search);
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
    showUpdate,
    mediaChecked,
  };
};
