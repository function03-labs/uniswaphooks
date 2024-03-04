import { supabase } from "@lib/supabase";

export async function uploadImage(file: File, userId: string) {
  return await supabase.storage
    .from("avatars")
    .upload(userId + "/avatar.png", file);
}

export async function deleteImage(userId: string) {
  return await supabase.storage
    .from("avatars")
    .remove([userId + "/avatar.png"]);
}

export async function getDownloadUrl(userId: string) {
  return await supabase.storage.from("avatars").list(userId);
}

export async function manageImage(file: File, userId: string) {
  if (
    await getDownloadUrl(userId).then((res) => res.data && res.data.length > 0)
  ) {
    deleteImage(userId);
  }

  await uploadImage(file, userId);

  const { data, error } = await getDownloadUrl(userId);
  if (error) {
    throw error;
  }

  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL +
    "/storage/v1/object/public/avatars/" +
    userId +
    "/avatar.png"
  );
}
