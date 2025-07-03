import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL!,
});

async function deleteFromCloudinary(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Erro ao apagar imagem do Cloudinary:", error);
  }
}

async function uploadToCloudinaryPFP(buffer: Buffer) {
  return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "pfp",
          resource_type: "image",
          overwrite: true,
        },
        (error, result) => {
          if (error || !result) {
            reject(error);
          } else {
            resolve({ secure_url: result.secure_url, public_id: result.public_id });
          }
        }
      )
      .end(buffer);
  });
}

async function uploadToCloudinaryBanner(buffer: Buffer) {
  return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "banner",
          resource_type: "image",
          overwrite: true,
        },
        (error, result) => {
          if (error || !result) {
            reject(error);
          } else {
            resolve({ secure_url: result.secure_url, public_id: result.public_id });
          }
        }
      )
      .end(buffer);
  });
}

export { deleteFromCloudinary, uploadToCloudinaryPFP, uploadToCloudinaryBanner };
export default cloudinary;
