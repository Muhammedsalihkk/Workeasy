// Small helper utilities for profile images
export const DEFAULT_AVATAR = "https://img.freepik.com/premium-vector/vector-flat-illustration-black-color-avatar-user-profile-person-icon.jpg";

export function getProfileImage(obj) {
  if (!obj) return DEFAULT_AVATAR;
  return obj.img || obj.avatar || obj.logo || DEFAULT_AVATAR;
}

// Append file to FormData under multiple possible field names so backend can accept either
export function appendImageToFormData(fd, file, fieldNames = ["image"]) {
  if (!file) return fd;
  fieldNames.forEach((name) => fd.append(name, file));
  return fd;
}
