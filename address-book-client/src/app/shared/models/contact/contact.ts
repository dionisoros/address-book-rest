import {ContactResponse} from "./contact.interface";

export class Contact {

  public _id?: string | number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public country?: string;

  constructor(data?: ContactResponse) {
    if (!data) {
      return
    }

    this._id = data._id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.country = data.country;
  }
}
