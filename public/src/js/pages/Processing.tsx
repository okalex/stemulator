import React from 'react';
import { Text } from '@fluentui/react-components';
import { useAppStore } from '../stores/AppStore';

export default function Processing() {

    const appStore = useAppStore();

    return (
        <div>
            <div>
                Progress bar
            </div>

            <div>
                <Text>Processing audio… {appStore.progress}%</Text>
            </div>
        </div>
    );
}
