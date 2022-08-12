import { MediaType } from 'types';

type MediaDisplayProps = {
  media_type: MediaType;
  src: string;
  title: string;
};

export const MediaDisplay: React.FC<MediaDisplayProps> = props => {
  const { media_type, src, title } = props;
  if (!src) return null;

  switch (media_type) {
    case 'audio': {
      return (
        <audio controls>
          <source src={src} type='audio/mpeg' />
        </audio>
      );
    }
    case 'image': {
      return <img alt={title} width='100%' src={src} />;
    }
    case 'video': {
      return (
        <video controls>
          <source src={src} type='video/mp4'></source>
        </video>
      );
    }
    default:
      return null;
  }
};
