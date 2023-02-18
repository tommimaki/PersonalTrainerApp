
import { Customer, CustomerResponse } from "../customerlisting/CustomerDef";
import { Training } from "../traininlisting/Training";

const baseUrl = "https://traineeapp.azurewebsites.net/api/customers";

export function fetchCustomers(): Promise<Customer[]> {
    return fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then((response) => response.json())
        .then((data) => data.content)
        .catch((error) => {
            console.log(error);
            return [];
        });
}


export function addCustomer(customer: CustomerResponse): Promise<CustomerResponse> {
    return fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log(error);
            return null;
        });
}

export function updateCustomer(
    customer: Customer,
    link: string
): Promise<Customer> {
    return fetch(link, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log(error);
            return null;
        });
}

export function fetchTrainings(): Promise<Training[]> {
    const url = 'https://traineeapp.azurewebsites.net/gettrainings';
    return fetch(url)
        .then(response => response.json())
        .then(data => data)
        .catch((error) => {
            console.log(error);
            return [];
        });
}