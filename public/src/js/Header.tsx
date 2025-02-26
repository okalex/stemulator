import React from 'react';
import { Text, Title1 } from '@fluentui/react-components';
import { useAppStore } from './stores/AppStore';
import { getFileNameFromPath } from './utils/files';

export default function Header() {

    const appStore = useAppStore();

    return (
        <div>
            <Title1>Stemulator</Title1>
        </div>
    );
};
