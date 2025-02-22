import React from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DroppedFiles } from './DroppedFiles';
import { Text } from '@fluentui/react-components';

type Props = {
    onDrop: (onDrop: DroppedFiles) => void,
}

export default function Dropzone({ onDrop }: Props) {

    const [, drop] = useDrop(
        () => ({
            accept: [NativeTypes.FILE],
            drop(item) {
                if (onDrop) {
                    onDrop(item as DroppedFiles);
                }
            }
        }),
        [onDrop]
    );

    return (
        <div ref={drop}>
            <Text align="center">
                <div>Upload icon</div>
                <div>Drop file here</div>
            </Text>
        </div>
    );
}
