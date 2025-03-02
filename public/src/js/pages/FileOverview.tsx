import React from 'react';
import { AudioPlayer } from '../components/AudioPlayer/AudioPlayer';
import { useAppStore } from '../stores/AppStore';
import { Model } from '../components/ModelSelector/Model';
import { Button, Card, CardBody } from '@material-tailwind/react';
import AudioMetadata from '../components/AudioPlayer/AudioMetadata';
import { Column, Row } from '../components/Base/Grid';
import { AudioPlayerControls } from '../components/AudioPlayer/AudioPlayer';
import AlbumArt from '../components/AudioPlayer/AlbumArt';
import { TbArrowsSplit2 } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { useAudioPlayerStore } from '../components/AudioPlayer/AudioPlayerStore';

export default function FileOverview() {

    const appStore = useAppStore();
    const audioPlayerStore = useAudioPlayerStore();

    function handleProcess(): void {
        console.log("handleProcess", appStore.currentFile);
        appStore.setProcessing(true);
        window.api.processAudio(appStore.currentFile, Model.mel_band_roformer);
    }

    function handleCancel(): void {
        appStore.reset();
        audioPlayerStore.reset();
    }

    return (
        <div className="w-full">
            <Card className="mt-8 mb-8 p-2 shadow-lg">
                <CardBody>
                    <Row className="gap-4">
                        <Column className="grow">
                            <AudioMetadata className="w-full mb-4 text-lg" />
                            <Row className="items-center gap-4">
                                <AudioPlayerControls />
                                <AudioPlayer height={80} className="grow" url={appStore.currentFile} />
                            </Row>
                        </Column>
                        <AlbumArt className="w-36 h-36" />
                    </Row>
                </CardBody>
            </Card>

            <Row className="gap-4  justify-center">
                <Button size="lg" variant="solid" className="text-lg rounded-lg" onClick={handleProcess}>
                    <TbArrowsSplit2 className="text-xl mr-1" />
                    Separate Stems
                </Button>
                <Button size="lg" variant="outline" className="text-lg rounded-lg hover:bg-red-500 hover:border-red-700" onClick={handleCancel}>
                    <MdCancel className="text-xl mr-1" />
                    Cancel
                </Button>
            </Row>
        </div>
    );

};
