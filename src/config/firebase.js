import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, collection, doc, onSnapshot, deleteDoc, addDoc, query, where } from "firebase/firestore"
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
const cartProductRef = collection(db, "carts");

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


export const useCartProductsListenerLength = () => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        return onSnapshot(cartProductRef, (snapshot) => {
            setCart(
                snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return { id: doc.id, ...data, }
                })
            )
        });
    }, []);
    return cart;
}
/*
export const useCartProductsListener1 = () => {
    const [cart, setCart] = useState([]);
    const uid = database.currentUser.uid; // Kullanıcının UID'sini al
    const currentUser = database.currentUser;

    useEffect(() => {
        if (!currentUser) return;
        if (!uid) return;
        const userCartQuery = query(cartProductRef, where('uid', '==', uid)); // Kullanıcının sepetini sorgula

        const unsubscribe = onSnapshot(userCartQuery, (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setCart(items);
        });

        return () => unsubscribe(); // useEffect içinde clean-up fonksiyonu
    }, [currentUser]); // Kullanıcı kimliği değiştiğinde useEffect yeniden çalışır

    return cart;
};
*/

export const useCartProductsListener = () => {
    const [cart, setCart] = useState([]);
    const currentUser = database.currentUser; // Kullanıcı nesnesini al

    useEffect(() => {
        if (!currentUser) return; // Kullanıcı oturumu olmadan işlem yapmayı önle
        const uid = currentUser.uid; // Kullanıcının UID'sini al

        // carts koleksiyonunu referans al
        const userCartQuery = query(cartProductRef, where('uid', '==', uid)); // Kullanıcının sepetini sorgula

        const unsubscribe = onSnapshot(userCartQuery, (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setCart(items);
        });

        return () => unsubscribe(); // useEffect içinde clean-up fonksiyonu
    }, [currentUser]); // Kullanıcı değiştiğinde useEffect yeniden çalışır

    return cart;
};


/*
export const useCartProductsListener = () => {
    const [cart, setCart] = useState([]);

    const uid = database.currentUser.uid

    useEffect(() => {
        const unsubscribe = onSnapshot(query(cartProductRef, where('x25naaruX3QSayBdCp162OV6P7m2', '==', uid)), (snapshot) => {
            setCart(
                snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                })
            );
        });
        return () => unsubscribe();
    }, []);

    return cart;
};
*/


export const deleteProduct = (id) => {
    deleteDoc(doc(db, "bestSellingProducts", id))
}
export const deleteCartProduct = (id) => {
    deleteDoc(doc(db, "carts", id))
}


export const addProductCart = (img, name, price, selectedSize) => {
    const uid = database.currentUser?.uid
    if (!uid) return;
    addDoc(cartProductRef, {
        img: img,
        name: name,
        price: price,
        selectedSize:selectedSize,
        amount: 1,
        uid: uid,
    })
}
