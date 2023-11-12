import { collection, addDoc } from "firebase/firestore";

export const Crud = {
  criarUsuario: async (db, idUsuario) => {
    try {
      const usersRef = collection(db, "users");

      const docRef = await addDoc(usersRef, {
        idUser: idUsuario,
      });

      console.log("Usuário adicionado com ID: ", docRef.id);
    } catch (error) {
      console.error("Erro ao adicionar usuário: ", error);
    }
  },

};
