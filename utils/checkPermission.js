import jwt from "jsonwebtoken";

export const checkPermission = (id, req) => {
  const { id: tokenId } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

  return id === tokenId;
};
