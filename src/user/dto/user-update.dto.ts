export class UserUpdateDto {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  isActive?: boolean;
}
