import React from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Customertable.css';

import { Button } from '@mui/material';
import { Customer } from "./CustomerDef";
import { EditCustomer } from './Editcustomer';






interface Props {
    list: { [key: string]: any }[]
    deleteCustomer: (link: string) => void;
    updateCustomer: (customer: Customer, link: string) => void;
}



export const Customertable = (props: Props) => {
    console.log(props.list)






    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: "agNumberColumnFilter" },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: "agNumberColumnFilter" },
        { field: 'city', sortable: true, filter: "agTextColumnFilter" },
        {
            headerName: '',
            width: 100,
            cellRendererFramework: (params: any) => (
                <EditCustomer customer={params.data} updateCustomer={props.updateCustomer} link={params.data.link} />
            ),
        },
        {
            field: 'link',
            cellRendererFramework: (params: any) => (
                <Button
                    variant='text' style={{ color: 'red' }}
                    onClick={() => {
                        console.log(params.value);
                        props.deleteCustomer(params.value);

                    }}>Delete</Button>
            ),
        },

    ]



    const rows = props.list.map(client => {
        return {
            firstname: client.firstname,
            lastname: client.lastname,
            email: client.email,
            phone: client.phone,
            streetaddress: client.streetaddress,
            postcode: client.postcode,
            city: client.city,
            link: client.links[0].href
        };
    });



    return (
        <div className="ag-theme-alpine-dark" style={{ height: '100vh', width: '100%' }}>
            <AgGridReact columnDefs={columns} rowData={rows} />
        </div>
    )

}