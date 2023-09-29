import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storageInstance } from "../lib/firebase";

export async function handleImageUpload(
  userId,
  file,
  name,
  setPercentageUploaded,
  callback
) {
  try {
    if (file === null || file === undefined) {
      throw new Error("Please choose a file first");
    }

    const storageRef = ref(storageInstance, `/avatars/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercentageUploaded(percent);
      },
      (err) => {
        throw err;
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        callback(url);
      }
    );
  } catch (error) {
    throw error;
  }
}
