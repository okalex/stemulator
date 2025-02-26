import React from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DroppedFiles } from './DroppedFiles';
import { makeStyles, Text } from '@fluentui/react-components';

type Props = {
    onDrop: (onDrop: DroppedFiles) => void,
}

const useStyles = makeStyles({
    dropzone: {
        border: '3px solid #ccc',
        borderRadius: '10px',
        padding: '2rem',
        textAlign: 'center',
    },
});

export default function Dropzone({ onDrop }: Props) {

    const styles = useStyles();

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
        <div ref={drop} className={styles.dropzone}>
            <Text align="center">
                <div>Upload icon</div>
                <div>Drop file here</div>
            </Text>
        </div>
    );
}
