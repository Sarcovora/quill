# Quill - A Modern Fullstack SaaS-Platform that allows you to chat with your PDFs

![Project Image](https://github.com/Sarcovora/quill/blob/main/public/thumbnail.png)

## A couple notes

- Built this following a tutorial from Josh Tried Coding on YT
- 12 hour tutorial, spent around an extra 20 hours on top of it understanding and debugging
- The goal of doing this project was to learn NextJS and more about the process of making a full-stack app.
- Here is the video linked: [Build a Complete SaaS Platform with Next.js 13, React, Prisma, tRPC, Tailwind | Full Course 2023](https://youtu.be/ucX2zXAZ1I0?si=EFpTDBI06R3O8fxW)

## What is this?

- This is a full-stack SaaS platform that allows users to upload PDFs and "chat" with the PDF using AI.
- This app includes mobile support, secure paym
- Built with the Next.js 14 App Router, tRPC, TypeScript, Prisma & Tailwind, Stripe, OpenAI API, Pinecone, Kinde, and more.

## Issues I ran into and how I fixed them

- As some of the packages used in this project were updated since the tutorial was made, I had to do some digging into their documentation to figure out how to fix the errors.
- For example:
  - I made changes to the `middleware.ts` file to make it match the up to date Kinde documentation.
  - Additionally, I changed all the `getKindeServerSession` calls to use `await` when getting the user.

## Future Improvements

## Features

- 🛠️ Complete SaaS Built From Scratch
- 💻 Beautiful Landing Page & Pricing Page Included
- 💳 Free & Pro Plan Using Stripe
- 📄 A Beautiful And Highly Functional PDF Viewer
- 🔄 Streaming API Responses in Real-Time
- 🔒 Authentication Using Kinde
- 🎨 Clean, Modern UI Using 'shadcn-ui'
- 🚀 Optimistic UI Updates for a Great UX
- ⚡ Infinite Message Loading for Performance
- 📤 Intuitive Drag n’ Drop Uploads
- ✨ Instant Loading States
- 🔧 Modern Data Fetching Using tRPC & Zod
- 🧠 LangChain for Infinite AI Memory
- 🌲 Pinecone as our Vector Storage
- 📊 Prisma as our ORM
- 🔤 100% written in TypeScript
- 🎁 ...much more

