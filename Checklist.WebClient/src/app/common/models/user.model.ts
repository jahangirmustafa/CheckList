export class UserModel{
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;

  constructor(model) {
    {
      this.username = model.username || '';
      this.password = model.password || '';
      this.firstName = model.firstName || '';
      this.lastName = model.lastName || '';
      this.role = model.role || '';
    }
  }
}
