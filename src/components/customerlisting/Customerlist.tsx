import React, { useEffect, useState } from "react";
import { Customertable } from "./Customertable";
import { Customer } from "./CustomerDef";

export const Customerlist = () => {


    const [customerList, setCustomerList] = useState<Object[]>([]);
    function fetchCustomers(): Promise<Customer[]> {

        let url = 'https://traineeapp.azurewebsites.net/api/customers'
        return fetch(url)
            .then(response => response.json())
            .then(data => data.content)
            .catch((error) => {
                console.log(error)
                return [];
            });
    }
    




    useEffect(() => {
        fetchCustomers().then(data=>setCustomerList(data))
    }, [])



    return (
        <div>
            <h2>Customerlist</h2>
            <Customertable list={customerList} />
        </div>
    )
}


