import { IsEmail, IsString, MinLength } from 'class-validator';

// DTO is the boundary protector of your application. prevents invalid data from entering
// class because we want to use it as a DTO (Data Transfer Object) 
// typescript interfaces disappear after compilation, so we use a class to ensure the validation works
export class RegisterDto {
  @IsString()// decorator
  name: string; //

  @IsEmail() // decorator
  email: string;

  @IsString() // decorator
  @MinLength(6) // decorator
  password: string;
}
