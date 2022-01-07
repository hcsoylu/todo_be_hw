import jwt from "jsonwebtoken";

export const createJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
