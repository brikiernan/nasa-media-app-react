import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from 'providers';
import Breadcrums from 'components/breadcrums';

export const Details: React.FC = () => {
  const { search } = useAppContext();
  const { nasa_id } = useParams();

  useEffect(() => {
    console.log(nasa_id);
  }, [nasa_id]);

  return (
    <>
      <Breadcrums {...{ nasa_id, search }} />
      <div>Details...</div>
      Search is: {search}
    </>
  );
};
