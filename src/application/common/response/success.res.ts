/** 성공 응답객체 */
export class SuccessRes {
  constructor({ status = 200, message = 'success', data = {} }) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
  status: number;

  message: string;

  data: object;
}
