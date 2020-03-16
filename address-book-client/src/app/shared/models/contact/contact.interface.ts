export interface ContactResponse {
  _id?: number | string,
  firstName: string,
  lastName: string,
  email: string,
  country?: string,
  image?: string
}

export type ContactList = ContactResponse[];
