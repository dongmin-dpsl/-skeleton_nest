import { User } from 'src/template/openSearch/User';

export class UpdateUserDto {
  email: string;

  firstName: string;

  gender: string;

  id: string;

  ipAddress: string;

  lastName: string;

  /** 오픈서치와 매핑작업을 위한 메소드
   * @returns
   */
  public getMapperOpenSearch() {
    return {
      [User.id._]: this.id,
      [User.email._]: this.email,
      [User.first_name._]: this.firstName,
      [User.last_name._]: this.lastName,
      [User.gender._]: this.gender,
      [User.ip_address._]: this.ipAddress,
    };
  }
}
