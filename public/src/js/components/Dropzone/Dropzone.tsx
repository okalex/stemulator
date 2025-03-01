import React from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DroppedFiles } from './DroppedFiles';
import { FaUpload } from 'react-icons/fa6';

type Props = {
    onDrop: (onDrop: DroppedFiles) => void,
}

function UploadIcon() {
    return (
        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
    );
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

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('Files', event.target.files);
        let files = [];
        for (let file of event.target.files) {
            files.push({
                name: file.name,
                path: file['path'],
                size: file.size,
                type: file.type,
            });
        }
        onDrop({ files } as DroppedFiles);
    }

    return (
        <div ref={drop}>
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        .mp3 or .wav
                    </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={onChange} />
            </label>
        </div>
    );
}
