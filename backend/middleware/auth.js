const admin = require("firebase-admin");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No authentication token, access denied" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // The decoded token contains user information (e.g., uid)
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
