const { getFirestore } = require('firebase-admin/firestore');
const { collection, getDocs, doc, addDoc, setDoc, deleteDoc } = require('firebase/firestore');

var firebase = require("firebase-admin");
var serviceAccount = require("../serviceAccount.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});


const db = getFirestore(firebase.apps[0]);

async function update(userSaveData, data, id) {
    try {
        const { userEmail, kind } = userSaveData
        const _post = doc(db, `default`, userEmail, kind, id)
        return setDoc(_post, data)
    } catch (error) {
        throw error;
    }
}

async function create(userSaveData, data) {
    try {
        const { userEmail, kind } = userSaveData;
        const _post = collection(db, `default/${userEmail}/${kind}`)
        const resp = await addDoc(_post, data);
        return { ...data, id: resp.id }
    } catch (error) {
        throw error;
    }
}

async function remove(userSaveData, id) {
    try {
        const { userEmail, kind } = userSaveData;
        const removeItem = doc(db, `default`, userEmail, kind, id)
        const resp = await deleteDoc(removeItem)
        return resp;
    } catch (error) {
        throw error;
    }
}

async function listAll(userSaveData) {
    try {
        const { userEmail, kind } = userSaveData;
        const postCol = collection(db, `default/${userEmail}/${kind}`);
        const resp = await getDocs(postCol);
        console.log("resp", resp)
        const returnList = resp.docs.map((doc) => { return { id: doc.id, ...doc.data() } });
        return returnList;
    } catch (error) {
        console.log('error', error)
        throw error;
    }
}

async function getById(entity) {
    try {
        const citiesCol = collection(db, entity);
        const resp = await getDocs(citiesCol);
        const returnList = resp.docs.map((doc) => doc.data());
        return returnList;
    } catch (error) {
        throw error;
    }
}


module.exports.update = update;
module.exports.create = create
module.exports.remove = remove
module.exports.listAll = listAll
module.exports.getById = getById

// Na primeira frase de introdução, destacar mais o problema de física no brasil
// Colocar SEMPRE na terceira pessoa
// Link entre os capítulos
// Obstáculos no aprendizado de Física no Brasil -> ** Mudar esse título
// Colocar toda a pilha de software novamente
// Colocar na fundamentação teórica sobre testes, cypress, API, deploy