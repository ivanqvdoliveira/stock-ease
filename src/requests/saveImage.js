import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const saveImageToStorage = async (pathName, image) => {
  const storageRef = ref(storage, pathName);
  await uploadBytes(storageRef, image);
  return await getDownloadURL(storageRef);
};
