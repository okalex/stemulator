import React from 'react';
import { FileObject } from '../types/FileObject';
import { Text } from '@fluentui/react-components';

type Props = {
    file: FileObject,
    progress: number
};

export default function Processing({ file, progress }: Props) {

    return (
        <div>
            <div>
                <Text>{file.name}</Text>
            </div>

            <div>
                Progress bar
            </div>

            <div>
                <Text>Processing audio… {progress}%</Text>
            </div>
        </div>
    );
}
