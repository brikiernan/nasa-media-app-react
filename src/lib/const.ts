export const dev = process.env.NODE_ENV === 'development';
export const imagesApi = 'https://images-api.nasa.gov';
export const imagesAssets = 'https://images-assets.nasa.gov';

export const initialParams = {
  q: '',
  page: '1',
  media_type: 'image,video,audio',
  year_start: '1920',
  year_end: new Date().getFullYear().toString(),
};

export enum Path {
  details = '/:id',
  home = '/',
  search = '/search',
}
