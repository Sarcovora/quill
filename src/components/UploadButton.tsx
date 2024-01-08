'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from './ui/button';

import Dropzone from 'react-dropzone';

const UploadDropzone = () => {
    return (
        <Dropzone multiple={false}>
            {({ getRootProps, getInputProps, acceptedFiles }) => (
                <div
                    {...getRootProps()}
                    className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
                >
                    <div className="flex items-center justify-center h-full w-full">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                UPLOAD PLEASE!
                            </div>
                        </label>
                    </div>
                </div>
            )}
        </Dropzone>
    );
};

const UploadButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(v) => {
                if (!v) {
                    setIsOpen(v);
                }
            }}
        >
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button>Upload PDF</Button>
            </DialogTrigger>

            <DialogContent>
                <UploadDropzone />
            </DialogContent>
        </Dialog>
    );
};

export default UploadButton;

/*
STUFF FOR UPLOADING PDFS

<div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">Upload PDF</p>
                    <p className="text-sm text-gray-500">
                        Drag and drop your PDF file here
                    </p>
                    <p className="text-sm text-gray-500">
                        or click to browse
                    </p>
                    <div className="flex flex-col items-center justify-center w-full h-32 mt-4 bg-gray-100 border-2 border-gray-300 border-dashed rounded-md">
                        <svg
                            className="w-8 h-8 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                            ></path>
                        </svg>
                        <p className="text-sm text-gray-500">
                            Drop your PDF file here
                        </p>
                    </div>
                </div>





*/
