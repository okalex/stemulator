import React from 'react';
import { useAudioPlayerStore } from './AudioPlayerStore';
import { Row } from '../Base/Grid';
import { Typography } from '@material-tailwind/react';
import AlbumArt from './AlbumArt';
import { FaMusic } from 'react-icons/fa6';

type Props = {
  className?: string;
};

export default function AudioMetadata({ className }: Props) {
  const audioPlayerStore = useAudioPlayerStore();

  const { artist, title, album, albumArtUrl } = audioPlayerStore.metadata;

  return (
    <Row className={className}>
      <p>
        <span className="text-gray-400 mr-3"><FaMusic className="inline" /></span>
        <span className="font-bold text-gray-700 text-xl mr-2">{title}</span>
        <span className="text-gray-500 text-md"> {artist}</span>
      </p>
    </Row>
  );
}
