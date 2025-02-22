import React from 'react';
import { AudioPlayer } from '../components/AudioPlayer';
import { FileObject } from '../types/FileObject';
import { Button, Text } from '@fluentui/react-components';

type Props = {
    file: FileObject,
    onProcess: () => void,
    onCancel: () => void,
}

export default function FileOverview({ file, onProcess, onCancel }: Props) {

    return (
        <div>
            <div>
                <Text>
                    {file.name}
                </Text>
            </div>

            <div>
                <AudioPlayer height={80} url={file.path} />
            </div>

            <div>
                <Button onClick={onProcess}>Process</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </div>
        </div>
    );

};
