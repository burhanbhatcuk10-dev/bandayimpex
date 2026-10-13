import cloudinary, { CLOUDINARY_FOLDER, isCloudinaryConfigured } from "../config/cloudinary.js";

export const uploadBuffer = (buffer, folder = CLOUDINARY_FOLDER, resourceType = "image") =>
  new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(new Error("Cloudinary is not configured. Set CLOUDINARY_* env vars."));
    }
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    stream.end(buffer);
  });

export const destroyImage = async (publicId) => {
  if (!publicId || !isCloudinaryConfigured()) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.warn("Cloudinary destroy failed:", err.message);
  }
};
