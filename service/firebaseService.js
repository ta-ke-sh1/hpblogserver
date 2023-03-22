const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

const fetchAllDocuments = async (collectionRef) => {
    const documents = [];
    const querySnapshot = await db.collection(collectionRef).get();
    querySnapshot.forEach((doc) => {
        var obj = doc.data();
        obj.id = doc.id;
        documents.push(obj);
    });
    console.log(documents.length);
    return documents;
};

const fetchAllMatchingDocuments = async (collectionRef, criteria, keyword) => {
    const documents = [];
    const docRef = db.collection(collectionRef);
    const querySnapshot = await docRef.where(criteria, "==", keyword).get();
    querySnapshot.forEach((doc) => {
        documents.push(doc.data());
    });
    return documents;
};

const fetchDocumentById = async (collectionRef, id) => {
    if (id != null) {
        const docRef = db.collection(collectionRef).doc(id);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            return docSnap.data();
        }
        return null;
    }

    return null;
};

const addDocument = async (collectionRef, object) => {
    try {
        await db.collection(collectionRef).add(object);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return "Error";
    }
};

const deleteDocument = async (collectionRef, id) => {
    await db.collection(collectionRef).doc(id).delete();
    return {
        code: 200,
        message: "Deleted document with id: " + id,
    };
};

const setDocument = async (collectionRef, id, set_object) => {
    await db.collection(collectionRef).doc(id).set(set_object);
    return {
        code: 200,
        message: "Set document with id: " + id,
    };
};

const updateDocument = async (collectionRef, id, update_object) => {
    await db.collection(collectionRef).doc(id).update(update_object);
    return {
        code: 200,
        message: "Updated document with id: " + id,
    };
};

module.exports = {
    fetchAllDocuments,
    fetchAllMatchingDocuments,
    fetchDocumentById,
    addDocument,
    deleteDocument,
    updateDocument,
    setDocument,
};
