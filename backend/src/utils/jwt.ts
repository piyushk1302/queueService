import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface JwtPayload {
  studioId: string;
}

export const generateToken = (studioId: string): string => {
  return jwt.sign(
    {
      studioId,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};