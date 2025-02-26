import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Header from './Header';
import NewFile from './pages/NewFile';
import FileOverview from './pages/FileOverview';
import Processing from './pages/Processing';
import ProcessedAudio from './pages/ProcessedAudio';
import { useAppStore } from './stores/AppStore';
import { makeStyles } from '@fluentui/react-components';
import { useAppStyles } from './styles/appStyles';

require('./global');

export type OutputObject = {
    type: string,
    data: any
};

function Main() {
    const appStore = useAppStore();
    const styles = useAppStyles();

    function render(): JSX.Element {
        if (appStore.isProcessed) {
            return <ProcessedAudio />;
        } else if (appStore.isProcessing) {
            return <Processing />;
        } else {
            if (appStore.currentFile) {
                return <FileOverview />;
            } else {
                return <NewFile />;
            }
        }
    }

    return (
        <div className={styles.main}>
            {render()}
        </div>
    );
}

export default function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Header />
            <Main />
        </DndProvider>
    );
};
