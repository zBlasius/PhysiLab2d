import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const Crud = {
  criarUsuario: async (db, idUsuario) => {
    try {
      const usersRef = collection(db, "users");

      const docRef = await addDoc(usersRef, {
        idUser: idUsuario,
        exercises: {
          exercise01: false,
          exercise02: false,
          exercise03: false,
        },
      });

      console.log("Usuário adicionado com ID: ", docRef.id);
    } catch (error) {
      console.error("Erro ao adicionar usuário: ", error);
    }
  },

  listarUsuario: async (db, idUsuario) => {
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

      return docs;
    } catch (error) {
      console.error("Erro ao ´listar usuário: ", error);
    }
  },
};
