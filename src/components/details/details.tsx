import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Breadcrums from 'components/breadcrums';

export const Details: React.FC = () => {
  const { nasa_id } = useParams();

  useEffect(() => {
    console.log(nasa_id);
  }, [nasa_id]);

  return (
    <>
      <Breadcrums search='/search?q=mars%20rover' nasa_id={nasa_id} />
      <div>Details...</div>
    </>
  );
};
