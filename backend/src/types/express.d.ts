import "express";

declare global {
  namespace Express {
    interface Request {
      studioId?: string;
    }
  }
}

export {};