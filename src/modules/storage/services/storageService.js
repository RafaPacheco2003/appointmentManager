/**
 * Fachada del módulo Storage (Application Service).
 * Orquesta repositorio S3, URLs y configuración del bucket.
 * Los controleadores solo dependen de este archivo (Interface Segregation).
 */
const s3Repository = require('./s3StorageRepository');
const { buildPublicUrl, normalizePublicUrl } = require('./storageUrlService');
const { ensurePublicBucket } = require('./storageBucketService');


/** Sube imagen a Supabase S3 y retorna key + URL pública. */
const uploadImage = async (file, folder = 'uploads') => {
    const key = await s3Repository.upload(file, folder);

    return { key, url: buildPublicUrl(key) };
};


/** Elimina imagen del bucket S3. */
const deleteImage = (key) => s3Repository.remove(key);


module.exports = {
    uploadImage,
    deleteImage,
    buildPublicUrl,
    normalizePublicUrl,
    ensureStorageBucket: ensurePublicBucket
};
