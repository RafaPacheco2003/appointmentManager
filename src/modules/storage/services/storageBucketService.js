/**
 * Responsabilidad única: asegurar que el bucket exista y sea público en Supabase.
 * Se ejecuta al iniciar la app para que las URLs públicas funcionen en el navegador.
 */
const { getSupabaseUrl, getSupabaseClient, getBucketName } = require('../../../config/storage');


const getBucketSetupSql = (bucketName) => `
INSERT INTO storage.buckets (id, name, public)
VALUES ('${bucketName}', '${bucketName}', true)
ON CONFLICT (id) DO UPDATE SET public = true;
`.trim();


const logSqlFallback = (bucketName) => {
    console.warn('[Storage] Falta SUPABASE_SERVICE_roleE_KEY en tu .env.');
    console.warn(`[Storage] Proyecto: ${getSupabaseUrl() || 'desconocido'}`);
    console.warn('[Storage] Ejecuta esto en Supabase → SQL Editor:');
    console.warn(getBucketSetupSql(bucketName));
};


const ensurePublicBucket = async () => {
    const bucketName = getBucketName();
    const supabase = getSupabaseClient();

    if (!bucketName) {
        console.warn('[Storage] SUPABASE_BUCKET no está definido.');
        return;
    }

    if (!supabase) {
        logSqlFallback(bucketName);
        return;
    }

    const { data: buckets, error: listError } =
        await supabase.storage.listBuckets();

    if (listError) {
        console.error('[Storage] Error listando buckets:', listError.message);
        return;
    }

    const existing = buckets.find(
        (item) => item.id === bucketName || item.name === bucketName
    );

    if (!existing) {
        const { error } = await supabase.storage.createBucket(bucketName, {
            public: true
        });

        if (error) {
            console.error('[Storage] Error creando bucket:', error.message);
            console.warn('[Storage] Ejecuta en Supabase → SQL Editor:');
            console.warn(getBucketSetupSql(bucketName));
            return;
        }

        console.log(`[Storage] Bucket "${bucketName}" creado como público.`);
        return;
    }

    if (!existing.public) {
        const { error } = await supabase.storage.updateBucket(existing.id, {
            public: true
        });

        if (error) {
            console.error('[Storage] Error actualizando bucket a público:', error.message);
            return;
        }

        console.log(`[Storage] Bucket "${bucketName}" actualizado a público.`);
        return;
    }

    console.log(`[Storage] Bucket "${bucketName}" listo (público).`);
};


module.exports = { ensurePublicBucket };
