import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, collection, doc, onSnapshot, deleteDoc, addDoc, query, where, updateDoc, getDocs } from "firebase/firestore"
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

const allProductsRef = collection(db, "allProducts");
const cartProductRef = collection(db, "carts");

export const useBestSellingsProductsListener = () => {

    const [bestSellingProducts, setBestSellingProducts] = useState([]);

    useEffect(() => {
        const userCartQuery = query(allProductsRef, where('bestSelling', '==', true)); // Kullanıcının sepetini sorgula

        const unsubscribe = onSnapshot(userCartQuery, (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setBestSellingProducts(items);
        });

        return () => unsubscribe();
    }, []);
    return bestSellingProducts;
}
export const useAllProductsListener = () => {

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        return onSnapshot(allProductsRef, (snapshot) => {
            setAllProducts(
                snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return { id: doc.id, ...data, }
                })
            )
        });
    }, []);
    return allProducts;
}
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
export const deleteAllProductsProduct = (productId) => {
    const allProductsq = query(collection(db, 'allProducts'), where('productId', '==', productId));

    // Belgeleri getir
    getDocs(allProductsq).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Her bir belgeyi sil
            deleteDoc(doc.ref);
            console.log(`"${doc.id}" ID'sine sahip belge başarıyla silindi.`);
        });
    }).catch((error) => {
        console.error('Belgeler getirilirken bir hata oluştu: ', error);
    });

    const cartsq = query(collection(db, 'carts'), where('productId', '==', productId));

    // Belgeleri getir
    getDocs(cartsq).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Her bir belgeyi sil
            deleteDoc(doc.ref);
            console.log(`"${doc.id}" ID'sine sahip belge başarıyla silindi.`);
        });
    }).catch((error) => {
        console.error('Belgeler getirilirken bir hata oluştu: ', error);
    });
}
export const addProductCart = (productId, img, name, price, selectedSizes) => {
    const uid = database.currentUser?.uid
    if (!uid) return;
    addDoc(cartProductRef, {
        productId: productId,
        img: img,
        name: name,
        price: price,
        selectedSizes: selectedSizes,
        amount: 1,
        uid: uid,
    })
}
export const addBestSellingProducts = async (id) => {
    try {
        const documentRef = doc(db, 'allProducts', id);
        await updateDoc(documentRef, { bestSelling: true });
    } catch (error) {
        console.error('güncellenirken bir hata oluştu: ', error);
    }
}
export const removeBestSellingProducts = async (id) => {
    try {
        const documentRef = doc(db, 'allProducts', id);
        await updateDoc(documentRef, { bestSelling: false });
    } catch (error) {
        console.error('güncellenirken bir hata oluştu: ', error);
    }
}
