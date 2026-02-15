import { Injectable, ConflictException } from '@nestjs/common'; //Injectable() allows this service to be injected into controllers. Without it, Nest cannot manage it.
import { RegisterDto } from './dto/register.dto';
// import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'; // password hashing and salting
// import { v4 as uuidv4 } from 'uuid'; // for uuid generation
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable() //Registers this class with NestJS DI container. (Nest can inject this into other classes (like controllers).)
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }
  async register(dto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);  // 10 is the salt rounds, which determines how secure the hash is (and how long it takes to compute)

      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
        },
        select: { // this tells what fields to return
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
          deletedAt: true,
        },
      });

      return user;

    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' // Unique constraint failed (email already exists)
      ) {
        throw new ConflictException({
          error: 'User already exists',
        });
      }

      throw error;
    }
  }
}


// Encryption is: Reversible transformation using a key. Not used because if key is compromised, all passwords are compromised. Also, encryption is slower than hashing.

// Hashing is: Irreversible transformation, no key, same input always gives same output, used for password storage.
// If someone logs in:
// You hash the entered password again and compare hashes.

// Salting is: Adding random data to the input of a hash function to ensure that the same input does not always produce the same output, which protects against rainbow table attacks.
// For example, if two users have the same password, salting ensures their hashes are different.