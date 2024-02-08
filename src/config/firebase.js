import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, collection, doc, onSnapshot, deleteDoc } from "firebase/firestore"
import { useEffect, useState } from "react";


const firebaseConfig = {
    apiKey: "AIzaSyAJ4zicHyKOAUv_D8f_aSjpDBbX-gc26EA",
    authDomain: "shoes-store-f904d.firebaseapp.com",
    projectId: "shoes-store-f904d",
    storageBucket: "shoes-store-f904d.appspot.com",
    messagingSenderId: "398626237302",
    appId: "1:398626237302:web:d255323cb17da96aba6857"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app)
export const db = getFirestore(app)

const productsRef = collection(db, "bestSellingProducts");

export const useProductsListener = () => {

    const [bestSellingProducts, setBestSellingProducts] = useState([]);

    useEffect(() => {
        return onSnapshot(productsRef, (snapshot) => {
            setBestSellingProducts(
                snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return { id: doc.id, ...data, }
                })
            )
        });
    }, []);
    return bestSellingProducts;
}

export const deleteProduct = (id) => {
    deleteDoc(doc(db, "bestSellingProducts", id))
}

/*
export const addProduct = () => {
    const uid = database.currentUser?.uid
    if (!uid) return;
    addDoc(productsRef, {
        name: "Product",
        uid: uid,
    })
}
*/