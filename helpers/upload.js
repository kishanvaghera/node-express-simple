import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp";

const ResizeImage = async (file) => {
    return await sharp(file.buffer)
        .resize({
            width: 250,
            height: 250,
            fit: sharp.fit.inside,
            withoutEnlargement: true
        }).toBuffer();
}

const uploadFileToS3 = async (buffer, mimetype, next) => {
    const metaData = await sharp(buffer).metadata();
    const FileExtension = metaData.format || "jpg";

    const key = `${Date.now()}.${FileExtension}`;

    const Location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    const Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        }
    });

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: mimetype
    };

    try {
        const command = new PutObjectCommand(params);
        Client.send(command);

        return { Location, key };
    } catch (error) {
        return CustErroHelper(next, error.message, 404);
    }
}

export const uploadImageToS3 = async (file, next) => {
    const ResizeBuffer = await ResizeImage(file);

    return uploadFileToS3(ResizeBuffer, file.mimetype, next);
}