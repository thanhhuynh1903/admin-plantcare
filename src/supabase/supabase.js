import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const defaultBucket = 'everfresh_bucket';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadFile = async (filePath, file, bucket = defaultBucket) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getFile = async (filePath, bucket = defaultBucket) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(filePath);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteFile = async (filePath, bucket = defaultBucket) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getPublicUrl = async (filePath, bucket = defaultBucket) => {
  const {data, error} = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl.replace(/\/[^/]+$/, '');
}

export const uploadFileAndReturnUrl = async (filePath, file, bucket = defaultBucket) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const publicUrl = await getPublicUrl(bucket, data.fullPath);
  return publicUrl;
};

export default supabase;

