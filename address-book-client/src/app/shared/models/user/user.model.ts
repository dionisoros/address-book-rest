import {UserResponseInterface} from "./user.interface"

export class User {
  public _id: string;
  public firstName: string;
  public lastName: string;
  public age: number;
  public username: string;
  public email: string;
  public image: string;
  public password: string;

  constructor(data?: UserResponseInterface) {

    if (!data) {
      return;
    }

    this._id = data._id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.age = data.age;
    this.username = data.username;
    this.email = data.email;
    this.image = data.image;
    this.password = data.password;
  }

}
