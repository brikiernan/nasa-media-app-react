export enum Path {
  details = '/:id',
  home = '/',
  search = '/search',
}

export type Children = {
  children: React.ReactNode;
};

export type MediaType = 'audio' | 'image' | 'video';

type Data = {
  center: string;
  date_created: string;
  description: string;
  media_type: MediaType;
  nasa_id: string;
  title: string;
  keywords?: string[];
  location?: string;
  photographer?: string;
};

type Link = {
  href: string;
  rel: string;
  render: string;
};

export type Item = {
  data: Data[];
  href: string;
  links?: Link[];
};

export type Collection = {
  collection: {
    href: string;
    items: Item[];
    version: string;
  };
};

export type ExifData = {
  ApertureValue: number;
  Artist: string;
  CFAPattern: string;
  ColorSpace: string;
  Compression: string;
  Contrast: string;
  Copyright: string;
  CreateDate: string;
  CustomRendered: string;
  DateTimeOriginal: string;
  ExifImageHeight: number;
  ExifImageWidth: number;
  ExifVersion: string;
  ExposureCompensation: number;
  ExposureMode: string;
  ExposureProgram: string;
  ExposureTime: string;
  FNumber: number;
  FileSource: string;
  Flash: string;
  FocalLength: string;
  FocalLengthIn35mmFormat: string;
  FocalPlaneResolutionUnit: string;
  FocalPlaneXResolution: number;
  FocalPlaneYResolution: number;
  GainControl: string;
  ISO: number;
  ImageDescription: string;
  LensInfo: string;
  LensModel: string;
  LightSource: string;
  Make: string;
  MaxApertureValue: number;
  MeteringMode: string;
  Model: string;
  ModifyDate: string;
  OffsetTime: string;
  OffsetTimeDigitized: string;
  OffsetTimeOriginal: string;
  Orientation: string;
  RecommendedExposureIndex: number;
  ResolutionUnit: string;
  Saturation: string;
  SceneCaptureType: string;
  SceneType: string;
  SensingMethod: string;
  SensitivityType: string;
  SerialNumber: number;
  Sharpness: string;
  ShutterSpeedValue: string;
  Software: string;
  SubSecTime: number;
  SubSecTimeDigitized: number;
  SubSecTimeOriginal: number;
  SubjectDistanceRange: string;
  ThumbnailImage: string;
  ThumbnailLength: number;
  ThumbnailOffset: number;
  WhiteBalance: string;
  XResolution: number;
  YResolution: number;
};
