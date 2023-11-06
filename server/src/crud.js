var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const { getFirestore } = require('firebase-admin/firestore');
const { collection, getDocs, doc, addDoc, setDoc, deleteDoc } = require('firebase/firestore');
const db = getFirestore(); 
class Crud{ //! Testar
    email;

    constructor(email) {
        this.email = email;
    }

    async update(userSaveData, data, id){
        try {
            const {userEmail, kind} = userSaveData
            const _post = doc(db, `psicodevlicos`, userEmail, kind, id)
            return setDoc(_post, data)
        } catch (error) {
            throw error;
        }
    }

    async create(userSaveData, data) {
        try {
            const {userEmail, kind} = userSaveData;
            const _post = collection(db, `psicodevlicos/${userEmail}/${kind}`)
            const resp = await addDoc(_post, data);
            return { ...data, id: resp.id }   
        } catch (error) {
            throw error;
        }
    }

    async remove(userSaveData, id){
        try {
            const {userEmail, kind} = userSaveData;
            const removeItem = doc(db, `psicodevlicos`, userEmail, kind, id)
            const resp = await deleteDoc(removeItem)
            return resp;
        } catch (error) {
            throw error;
        }
    }

    async listAll(userSaveData){
        try {
            const {userEmail, kind} = userSaveData;
            const postCol = collection(db, `psicodevlicos/${userEmail}/${kind}`);
            const resp = await getDocs(postCol);
            console.log("resp", resp)
            const returnList = resp.docs.map((doc) => { return { id: doc.id, ...doc.data()}});
            return returnList;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }

    async getById(entity){
        try {
            const citiesCol = collection(db, entity);
            const resp = await getDocs(citiesCol);
            const returnList = resp.docs.map((doc) => doc.data());
            return returnList;
        } catch (error) {
            throw error;
        }
    }
}

module.exports.Crud = Crud;