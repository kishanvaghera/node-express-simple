import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"


export const RemoveImage = async (key) => {
    const Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        }
    });

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    };

    try {
        const command = new DeleteObjectCommand(params);
        await Client.send(command);
        return true;

    } catch (error) {
        return CustErroHelper(next, error.message, 404);
    }
}
