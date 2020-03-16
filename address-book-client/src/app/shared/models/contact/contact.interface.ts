export interface ContactResponse {
  _id?: number | string,
  firstName: string,
  lastName: string,
  email: string,
  country: string,
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;

}

export type ContactList = ContactResponse[];
