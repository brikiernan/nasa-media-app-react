import type { Item, MediaType, SearchParams } from 'types';
import { Path } from './const';

export const findItem = (items: Item[], id?: string) => {
  return items.find(({ data }) => data[0].nasa_id === id);
};

export const findAsset = (asset: string, size: string, type?: MediaType) => {
  const fileName = asset.split('~')[1];
  if (type === 'audio') return fileName === size + '.mp3';
  if (type === 'video') return fileName === size + '.mp4';
  return fileName === size + '.jpg';
};

export const setHttps = (url: string) => {
  if (url.charAt(4) !== 's') {
    return url.split(':').join('s:');
  }
  return url;
};

export const debounce = (func: Function, timeout = 300) => {
  let timer: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const setSearchUrl = (params: SearchParams) => {
  const { media_type, page, q, year_end, year_start } = params;
  return `${Path.search}?q=${q}&page=${page}&media_type=${media_type}&year_start=${year_start}&year_end=${year_end}`;
};
