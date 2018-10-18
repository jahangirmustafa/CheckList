export class PasswordModel {
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(model) {
    {
      this.username = model.username || '';
      this.oldPassword = model.oldPassword || '';
      this.newPassword = model.newPassword || '';
      this.confirmPassword = model.confirmPassword || '';
    }
  }
}
