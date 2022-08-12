import { useState, useEffect } from 'react';

import { client } from 'lib/client';
import { findAsset } from 'lib/utils';
// import { imagesAssets } from 'lib/const';
import { ExifData, MediaType } from 'types';

export const useAssets = (href?: string, id?: string, type?: MediaType) => {
  const [assets, setAssets] = useState<string[]>([]);
  const [exif, setExif] = useState<ExifData | null>(null);

  useEffect(() => {
    if (href && id) {
      const fetch = async () => {
        try {
          const [results] = await Promise.all([
            client.get<string[]>(href),
            // client.get(`${imagesAssets}/image/${id}/metadata.json`),
          ]);
          setAssets(results);
          setExif(null);
          // console.log(Object.entries(meta as any));
        } catch (error) {
          console.log(error);
        }
      };
      fetch();
    }
  }, [href, id]);

  return {
    origin: assets.find(asset => findAsset(asset, 'orig', type)) || null,
    large: assets.find(asset => findAsset(asset, 'large', type)) || null,
    medium: assets.find(asset => findAsset(asset, 'medium', type)) || null,
    small: assets.find(asset => findAsset(asset, 'small', type)) || null,
    exif,
  };
};
