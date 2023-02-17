import React, { useEffect, useState } from "react";
import { Customertable } from "./Customertable";
import { Customer } from "./CustomerDef";
import { Button } from "@mui/material";
import { Addcustomer } from "./Addcustomer";



export const Customerlist = () => {

    let url = 'https://traineeapp.azurewebsites.net/api/customers'

    const [customerList, setCustomerList] = useState<Object[]>([]);
    const [addCustomerDialogOpen, setAddCustomerDialogOpen] = useState(false);


    function fetchCustomers(): Promise<Customer[]> {

        return fetch(url)
            .then(response => response.json())
            .then(data => data.content)
            .catch((error) => {
                console.log(error)
                return [];
            });
    }



    function addCustomer(customer: Customer) {

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                fetchCustomers().then(data => setCustomerList(data))
            })
            .catch(error => console.log(error))
    }




    useEffect(() => {
        fetchCustomers().then(data => setCustomerList(data))
    }, [])



    return (
        <div>
            <Button onClick={() => setAddCustomerDialogOpen(true)}>Add Customer</Button>
            <Addcustomer open={addCustomerDialogOpen} addCustomer={addCustomer} onClose={() => setAddCustomerDialogOpen(false)} />
            <Customertable list={customerList} />
        </div>
    )
}


