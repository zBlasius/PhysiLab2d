
const firebase = require("./firebase");
const firebaseAuth = async (req, res) => {
  try {
    const userRequest = await firebase
      .database()
      .ref(`users/${req.body.uid}`)
      .once("value");
    const userPayload = userRequest.val();

    if (userPayload) {
      const tokenClaims = {
        roleId: userPayload.roleId,
      };

      await firebase.auth().setCustomUserClaims(user.uid, tokenClaims);

      return res.status(200).json({ data: tokenClaims });
    } else {
      return res.status(404).json({ error: { message: "No user found" } });
    }
  } catch (error) {
    return res.status(500).json({
      error: { message: "could not complete auth request" },
    });
  }
};

export default {
  firebaseAuth,
};
