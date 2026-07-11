/**
 * Capa de infraestructura de Storage.
 * Responsabilidad única: crear clientes y leer configuración de entorno.
 * Los servicios dependen de este módulo (Dependency Inversion).
 */
const { S3Client } = require('@aws-sdk/client-s3');
const { createClient } = require('@supabase/supabase-js');
const WebSocket = require('ws');


/** Extrae el project ref desde SUPABASE_S3_ENDPOINT o SUPABASE_CDN_URL. */
const getProjectRef = () => {
    const endpoint = process.env.SUPABASE_S3_ENDPOINT || '';
    const fromEndpoint = endpoint.match(/https:\/\/([^.]+)\.storage\.supabase\.co/);

    if (fromEndpoint) {
        return fromEndpoint[1];
    }

    const cdnUrl = process.env.SUPABASE_CDN_URL || '';
    const fromCdn = cdnUrl.match(/https:\/\/([^.]+)\.(?:storage\.)?supabase\.co/);

    return fromCdn?.[1] || null;
};


/** URL base del proyecto Supabase (API REST). */
const getSupabaseUrl = () => {
    if (process.env.SUPABASE_URL) {
        return process.env.SUPABASE_URL.replace(/\/$/, '');
    }

    const projectRef = getProjectRef();

    return projectRef ? `https://${projectRef}.supabase.co` : null;
};


/** Cliente S3 compatible con Supabase Storage. */
const s3 = new S3Client({
    forcePathStyle: true,
    region: process.env.SUPABASE_S3_REGION,
    endpoint: process.env.SUPABASE_S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID,
        secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY
    }
});


/**
 * Cliente Supabase para operaciones de administración (bucket público).
 * Requiere SUPABASE_SERVICE_roleE_KEY. Retorna null si no está configurado.
 */
const getSupabaseClient = () => {
    const url = getSupabaseUrl();
    const serviceroleeKey = process.env.SUPABASE_SERVICE_roleE_KEY;

    if (!url || !serviceroleeKey) {
        return null;
    }

    return createClient(url, serviceroleeKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        realtime: { transport: WebSocket }
    });
};


const getBucketName = () => process.env.SUPABASE_BUCKET;


module.exports = {
    s3,
    getProjectRef,
    getSupabaseUrl,
    getSupabaseClient,
    getBucketName
};
