import { useState, useEffect } from 'react';

import { ExifData, MediaType } from 'types';
import { client } from 'lib/client';
import { findAsset, setHttps } from 'lib/utils';
import { imagesAssets } from 'lib/const';

type AssetsParams = {
  href?: string;
  id?: string;
  type?: MediaType;
};

export const useAssets = ({ href, id, type }: AssetsParams) => {
  const [assets, setAssets] = useState<string[]>([]);
  const [exif, setExif] = useState<ExifData | null>(null);

  useEffect(() => {
    if (href && id) {
      const fetch = async () => {
        try {
          const [results, meta] = await Promise.all([
            client.get<string[]>(href),
            client.get<any>(`${imagesAssets}/${type}/${id}/metadata.json`),
          ]);

          setAssets(results.map(setHttps));

          const entries = Object.entries(meta);
          if (!!entries.length) {
            let exifObj = {};
            entries.forEach(entry => {
              const isExif = entry[0].split(':')[0] === 'EXIF';
              if (isExif) {
                const property = entry[0].split(':')[1];
                const value = entry[1];
                exifObj = { ...exifObj, [property]: value };
              }
            });

            const isExif = Object.keys(exifObj).length > 0;
            setExif(isExif ? exifObj : null);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetch();
    }
  }, [href, id, type]);

  return {
    origin: assets.find(asset => findAsset(asset, 'orig', type)) || null,
    large: assets.find(asset => findAsset(asset, 'large', type)) || null,
    medium: assets.find(asset => findAsset(asset, 'medium', type)) || null,
    small: assets.find(asset => findAsset(asset, 'small', type)) || null,
    thumb: assets.find(asset => findAsset(asset, 'thumb')) || null,
    exif,
  };
};
