import { z } from "zod";

const imageSizeLimit = 3 * 1024 * 1024; // 3mb
const songSizeLimit = 25 * 1024 * 1024; // 25mb
export const uploadSongSchema = z.object({
  title: z.string().min(3).max(80),
  author: z.string().min(3).max(80),

  songFile: z
    .instanceof(File) // Ensure the input is a File object
    .refine(
      (file) => ["audio/mp3", "audio/wav", "audio/mpeg"].includes(file.type), // Check if the file type is a valid audio type
      { message: "Invalid audio file type" }
    )
    .refine((file) => file.size <= songSizeLimit, {
      message: "File size should not exceed 25MB",
    }),
  imageFile: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Invalid image file type" }
    )
    .refine((file) => file.size <= imageSizeLimit, {
      message: "File size should not exceed 3MB",
    }),
});

export type UploadSongT = z.infer<typeof uploadSongSchema>;
