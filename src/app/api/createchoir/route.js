import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc, collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firestoreAdapter";

export async function POST(request) {
  try {
    const data = await request.json();
    const newChoirName = data.name;
    
    const choirsCollectionRef = collection(db, "choirs");
    const choirDocRef = await addDoc(choirsCollectionRef, {
      name: newChoirName,
      members: [],
      admins: [data.userId],
      code: Math.random().toString(36).substring(2, 8),
      adminCode: Math.random().toString(36).substring(2, 8)
    });
    
    const userDocRef = doc(db, "users", data.userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const choirs = userDoc.data().choirs || {};
      const newChoirId = choirDocRef.id;
      choirs[newChoirId] = newChoirName;

      await updateDoc(userDocRef, { choirs: choirs });
      
      // Creating channels and messages collection
      const channels = ["main", "soprano", "alto", "tenor", "bass"];
      const systemAvatarUrl = "https://firebasestorage.googleapis.com/v0/b/harmonyhive-b4705.appspot.com/o/system.png?alt=media&token=6fcc64dd-b9dc-4cc8-af7d-032fb7e9462e";
      const systemUser = {
        id: "system",
        name: "System",
        avatar: systemAvatarUrl
      };

      for (const channel of channels) {
        const channelDocRef = doc(db, `choirs/${newChoirId}/channels`, channel);
        await setDoc(channelDocRef, {
          name: channel.charAt(0).toUpperCase() + channel.slice(1)
        });
        await addDoc(collection(db, channelDocRef.path, "messages"), {
          createdAt: new Date(),
          message: `Welcome to the ${channel} channel!`,
          user: systemUser
        });
      }
      
      return NextResponse.json({ status: 200, message: "Choir created successfully" });
    } else {
      return NextResponse.json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
