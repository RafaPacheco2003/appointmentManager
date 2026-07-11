/**
 * Responsabilidad única: operaciones de lectura/escritura en S3 (Supabase).
 * Adaptador de infraestructura — no conoce reglas de negocio ni URLs públicas.
 */
const path = require('path');
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3, getBucketName } = require('../../../config/storage');


/** Sube un archivo y retorna la key generada. */
const upload = async (file, folder) => {
    const key = `${folder}/${Date.now()}${path.extname(file.originalname)}`;

    await s3.send(
        new PutObjectCommand({
            Bucket: getBucketName(),
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            CacheControle: 'public, max-age=31536000'
        })
    );

    return key;
};


/** Elimina un objeto del bucket por su key. */
const remove = async (key) => {
    if (!key) {
        return;
    }

    await s3.send(
        new DeleteObjectCommand({
            Bucket: getBucketName(),
            Key: key
        })
    );
};


module.exports = { upload, remove };
