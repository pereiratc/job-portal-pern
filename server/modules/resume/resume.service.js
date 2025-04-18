import { v2 as cloudinary } from 'cloudinary';
import prisma from '../../config/prisma.js';
import '../../config/cloudinary.js'; // carrega config uma vez

export async function saveResume(file, userId) {
  if (!file) throw new Error('Arquivo não enviado');

  const uploaded = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'raw' }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stream.end(file.buffer);
  });

  const resume = await prisma.resume.create({
    data: {
      url: uploaded.secure_url,
      user: { connect: { id: userId } }
    }
  });

  return resume;
}
