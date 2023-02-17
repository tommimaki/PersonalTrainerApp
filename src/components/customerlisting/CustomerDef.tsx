export type Customer = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
};

export interface CustomerF extends Customer {
  content: any[];
  links: {
    rel: string;
    href: string;
  }[];
  displayName: string;
}

export type CustomerResponse = {
  city: string;
  content: any[];
  email: string;
  firstname: string;
  lastname: string;
  links: {
    rel: string;
    href: string;
  }[];
  phone: string;
  postcode: string;
  streetaddress: string;
};
