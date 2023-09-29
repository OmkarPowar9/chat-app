import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, dbInstance } from "../lib/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

export async function signUp(email, password, displayName, imgUrl) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName,
    });

    setDoc(doc(dbInstance, "users", user.uid), {
      uid: user.uid,
      name: displayName,
      authProvider: "email",
      email: user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    setDoc(doc(dbInstance, "userChats", user.uid), {});

    return user;
  } catch (err) {
    throw err;
  }
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

export async function findUser(userName) {
  try {
    const userCollectionRef = collection(dbInstance, "users");
    const findUserQuery = query(
      userCollectionRef,
      where("name", "==", userName)
    );

    const userDocs = await getDocs(findUserQuery);

    if (userDocs.empty) throw new Error("User not found");

    return userDocs.docs[0].data();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUserImg(userId, imgUrl) {
  try {
    await updateDoc(doc(dbInstance, "users", userId), {
      imgUrl,
    });

    updateProfile(auth.currentUser, {
      photoURL: imgUrl,
    });
  } catch (error) {
    console.error(error);
  }
}
