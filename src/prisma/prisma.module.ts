import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

// other modules that need Prisma can import this PrismaModule, and then inject PrismaService to use the Prisma client for database operations.

/*
NestJS is built on:
Dependency Injection
Modular architecture
You cannot just create services and use them globally.
They must belong to a module.
*/