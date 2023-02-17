import React from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ValueFormatterParams } from 'ag-grid-community'
import { Button } from '@mui/material'


interface Props {
    list: { [key: string]: any }[]
    deleteTraining: (id: number) => void;
}

export const Trainingtable = (props: Props) => {
    console.log(props.list)

    const columns = [
        { field: 'customer', sortable: true, filter: "agTextColumnFilter" },
        { field: 'activity', sortable: true, filter: true },
        { field: 'duration', sortable: true, filter: "agNumberColumnFilter" },
        {
            field: 'date/time',
            sortable: true,
            filter: true,
            valueFormatter: (params: ValueFormatterParams) => {
                const date = new Date(params.data.date);
                return date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });
            },
        },
        {
            field: 'id',
            cellRendererFramework: (params: any) => (
                <Button
                    variant='text' style={{ color: 'red' }}
                    onClick={() => {
                        console.log(params.value);
                        props.deleteTraining(params.value);

                    }}>Delete</Button>
            ),
        },

    ]

    const rows = props.list.map(training => {
        return {
            activity: training.activity,
            customer: `${training.customer.firstname}  ${training.customer.lastname}`,
            duration: training.duration,
            date: training.date,
            id: training.id
        };
    });

    return (
        <div className="ag-theme-alpine-dark" style={{ height: '100vh', width: '100%' }}>
            <AgGridReact columnDefs={columns} rowData={rows} />
        </div>
    )
}
