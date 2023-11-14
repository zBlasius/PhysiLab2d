import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";


async function criarUsuario(db, idUsuario) {
  try {
    const usersRef = collection(db, "users");
    const listUsers = await listarUsuario(db, idUsuario)

    if(listUsers) return {error: true, message: "Usuário já cadastrado"}
    const docRef = await addDoc(usersRef, {
      idUser: idUsuario,
      exercises: {
        exercise01: false,
        exercise02: false,
        exercise03: false,
      },
    });

    console.log("Usuário adicionado com ID: ", docRef.id);
    return docRef.id
  } catch (error) {
    console.error("Erro ao adicionar usuário: ", error);
    return error
  }
}

async function listarUsuario(db, idUsuario) {
  try {
    const q = query(
      collection(db, "users"),
      where("idUser", "==", idUsuario)
    );

    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push(doc.data());
    });

    return docs[0];
  } catch (error) {
    console.error("Erro ao ´listar usuário: ", error);
  }
}

async function atualizarUsuario(db, idUsuario, newData) {
  try {
    const q = query(
      collection(db, "users"),
      where("idUser", "==", idUsuario)
    );

    const querySnapshot = await getDocs(q);
    let docRef = null;
    querySnapshot.forEach((doc) => {
      docRef = doc.ref;
    });

    if (docRef) {
      const res = await updateDoc(docRef, newData);
      return res;
    } else {
      console.error("Usuário não encontrado");
      return null;
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário: ", error);
    throw error;
  }
}

export default {
  criarUsuario, 
  listarUsuario,
  atualizarUsuario
}