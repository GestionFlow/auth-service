import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';


@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const adapter = new PrismaPg(pool);

    super({ adapter });
  }


  async onModuleInit() { // when Nest starts: Prisma connects to PostgreSQL automatically.
    await this.$connect();
  }

  async onModuleDestroy() { // when Nest shuts down: Prisma disconnects from PostgreSQL gracefully.
    await this.$disconnect();
  }
}


/*
This file:
Integrates Prisma into NestJS properly.
Without this file: Prisma works But not in a Nest-native, lifecycle-safe way
With this file: Prisma becomes a managed Nest service DB connection is controlled Shutdown is graceful
now a single client of prisma can be injected across the entire app, and it will be properly connected and disconnected according to the NestJS lifecycle.
*/