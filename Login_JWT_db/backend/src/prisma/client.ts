// src/prisma/client.ts
import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient();
/////////////////////////////////////////////////////////////////////////////
/// 🧠 O que ele faz?                                                     ///
/// Importa o cliente gerado pelo Prisma (com base no seu schema.prisma)  ///
/// Cria uma instância única (singleton) do Prisma Client e exporta ela   ///
/////////////////////////////////////////////////////////////////////////////