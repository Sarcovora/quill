import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
// import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAIEmbeddings } from '@langchain/openai';
// import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
// import { getPineconeClient } from '@/lib/pinecone';
import { pinecone } from '@/lib/pinecone';

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
        .middleware(async ({ req }) => {
            const { getUser } = getKindeServerSession();
            const user = await getUser();

            if (!user || !user.id) {
                throw new Error('Unauthorized');
            }

            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const createdFile = await db.file.create({
                data: {
                    key: file.key,
                    name: file.name,
                    userId: metadata.userId,
                    url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
                    uploadStatus: 'PROCESSING',
                },
            });

            try {
                const response = await fetch(
                    `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
                );
                const blob = await response.blob();

                const loader = new PDFLoader(blob);

                const pageLevelDocs = await loader.load();

                const pagesAmt = pageLevelDocs.length;


                // console.log('This happened before the pinecone stuff')

                // vectorize and index entire document
                // const pinecone = await getPineconeClient();
                const pineconeIndex = pinecone.Index('quill');

                // console.log('Another debug after pineconeIndex is defined')

                const embeddings = new OpenAIEmbeddings({
                    openAIApiKey: process.env.OPENAI_API_KEY,
                });

                // console.log('Another debug after embeddings is defined')

                await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
                    pineconeIndex,
                    namespace: createdFile.id,
                });

                // console.log('Another debug after PineconeStore.fromDocuments')

                // console.log('THIS WAS A SUCCESS!');
                await db.file.update({
                    data: {
                        uploadStatus: 'SUCCESS',
                    },
                    where: {
                        id: createdFile.id,
                    },
                });
            } catch (err) {
                console.log('REACHED AN ERROR: ' + err);
                await db.file.update({
                    data: {
                        uploadStatus: 'FAILED',
                    },
                    where: {
                        id: createdFile.id,
                    },
                });
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
