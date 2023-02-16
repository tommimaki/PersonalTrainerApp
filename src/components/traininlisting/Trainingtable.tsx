import React from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


interface Props {
    list: { [key: string]: any }[]
}

export const Trainingtable = (props: Props) => {
    console.log(props.list)

    const columns = [
        { field: 'date', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { field: 'duration', sortable: true, filter: "agNumberColumnFilter" },
        { field: 'customer', sortable: true, filter: "agTextColumnFilter" }
    ]

    const rows = props.list.map(training => {
        return {
            date: training.date,
            activity: training.activity,
            duration: training.duration,
            customer: training.customer
        };
    });

    return (
        <div className="ag-theme-alpine-dark" style={{ height: '100vh', width: '100%' }}>
            <AgGridReact columnDefs={columns} rowData={rows} />
        </div>
    )
}
