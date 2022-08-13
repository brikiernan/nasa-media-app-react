import { Item, MediaType } from 'types';
import { imagesAssets } from './const';

export const findItem = (items: Item[], id?: string) => {
  return items.find(({ data }) => data[0].nasa_id === id);
};

export const setMediaUrl = (id: string, type: MediaType, size?: string) => {
  const base = `${imagesAssets}/${type}/${id}/${id}~${size || 'orig'}`;
  if (type === 'audio') return base + '.mp3';
  if (type === 'video') return base + '.mp4';
  return base + '.jpg';
};

export const findAsset = (asset: string, size: string, type?: MediaType) => {
  const fileName = asset.split('~')[1];
  if (type === 'audio') return fileName === size + '.mp3';
  if (type === 'video') return fileName === size + '.mp4';
  return fileName === size + '.jpg';
};

export const setSearchPath = (query: string) => {
  return `/search?q=${query}`;
};

export const setHttps = (url: string) => {
  if (url.charAt(4) !== 's') {
    return url.split(':').join('s:');
  }
  return url;
};
