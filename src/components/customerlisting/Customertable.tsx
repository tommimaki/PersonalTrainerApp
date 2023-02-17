import React from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Customertable.css';





interface Props {
    list: { [key: string]: any }[]

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
        { field: 'city', sortable: true, filter: "agTextColumnFilter" }
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
        };
    });



    return (
        <div className="ag-theme-alpine-dark" style={{ height: '100vh', width: '100%' }}>
            <AgGridReact columnDefs={columns} rowData={rows} />
        </div>
    )

}