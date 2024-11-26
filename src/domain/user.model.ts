export class UserModel {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly gender: string;
  readonly ipAddress: string;
  readonly lastName: string;

  constructor(user: {
    id: string;
    email: string;
    first_name: string;
    gender: string;
    ip_address: string;
    last_name: string;
  }) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.first_name;
    this.gender = user.gender;
    this.ipAddress = user.ip_address;
    this.lastName = user.last_name;
  }
}
