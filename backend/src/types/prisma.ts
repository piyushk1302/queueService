import { PrismaClient, Prisma } from "@prisma/client";

export type PrismaTransaction = Omit<
  PrismaClient,
  keyof PrismaClient | "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends"
> &
  Prisma.TransactionClient;