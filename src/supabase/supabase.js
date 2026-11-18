import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const defaultBucket = 'everfresh_bucket';

// createClient throws on a missing URL, which would white-screen the whole app at import time
const client = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
const supabase = new Proxy({}, {
  get(_, key) {
    if (!client) throw new Error("Supabase is not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
    return client[key];
  },
});

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
  if (import.meta.env.VITE_MOCK === "true") {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }
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

