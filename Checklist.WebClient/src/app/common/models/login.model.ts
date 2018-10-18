export class LoginModel {
  username: string;
  password: string;

  constructor(model) {
    {
      this.username = model.username || '';
      this.password = model.password || '';

    }
  }
}
