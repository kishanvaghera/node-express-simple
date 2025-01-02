# Node.js Express REST API with AWS S3 for File Upload

This repository demonstrates how to create a REST API using Node.js and Express.js for uploading files to an AWS S3 bucket.

## Features

- Upload files to an AWS S3 bucket.
- Generate unique file names to prevent collisions.
- Retrieve uploaded file URLs.

## Prerequisites

Ensure you have the following before starting:

- Node.js installed on your system.
- AWS account with S3 bucket set up.
- AWS Access Key and Secret Key.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/kishanvaghera/node-express-simple.git
   cd nodejs-s3-upload
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure it as follows:

   ```env
   PORT=5000
   AWS_ACCESS_KEY=your-access-key-id
   AWS_SECRET_KEY=your-secret-access-key
   AWS_REGION=your-bucket-region
   AWS_BUCKET_NAME=your-bucket-name
   ```

## Usage

Start the server:

   ```bash
   npm run dev
   ```