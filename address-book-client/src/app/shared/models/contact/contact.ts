import {ContactResponse} from "./contact.interface";
import {User} from "../user/user.model";

export class Contact {

  public _id?: string | number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public country: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy?: string;
  public updatedBy?: string;

  constructor(data?: ContactResponse) {
    if (!data) {
      return
    }

    this._id = data._id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.country = data.country;
    this.createdAt = data.createdAt && new Date(data.createdAt);
    this.updatedAt = data.updatedAt && new Date(data.updatedAt);
    this.createdBy = data.createdBy;
    this.updatedBy = data.updatedBy;
  }
}
