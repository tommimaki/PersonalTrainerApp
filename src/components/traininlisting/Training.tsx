export type Training = {
    id: number;
    date: Date;
    duration: number;
    activity: string;
    customer: {
      id: number;
      firstname: string;
      lastname: string;
      streetaddress: string;
      postcode: string;
      city: string;
      email: string;
      phone: string;
    };
  };
  