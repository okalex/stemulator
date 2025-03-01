import React from 'react';
import { useAudioPlayerStore } from './AudioPlayerStore';
import { Row } from '../Base/Grid';
import { Typography } from '@material-tailwind/react';

type Props = {
  className?: string;
};

export default function AudioMetadata({ className }: Props) {
  const audioPlayerStore = useAudioPlayerStore();

  const { artist, title, album, albumArtUrl } = audioPlayerStore.metadata;

  return (
    <Row className={className}>
      <div>
        {albumArtUrl && (<img src={audioPlayerStore.metadata.albumArtUrl} className="h-48 mb-8" />)}
      </div>

      <div className="grow ml-4">
        <Typography className="font-bold">{title}</Typography>
        <Typography className="text-gray-500">{artist}</Typography>
      </div>
    </Row>
  );
}
