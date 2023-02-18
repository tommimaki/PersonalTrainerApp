import React, { useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { Button } from '@mui/material'
import { GridApi } from 'ag-grid-community';
import { ValueGetterParams } from 'ag-grid-community';

interface Props {
    list: { [key: string]: any }[]
    deleteTraining: (id: number) => void;
}

export const Trainingtable = (props: Props) => {
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    console.log(props.list)
    function onGridReady(params: any) {
        setGridApi(params.api);
    }

    const handleExportButtonClick = () => {
        if (gridApi) {
            const params = {
                fileName: 'data.csv',
                suppressQuotes: true,
                columnKeys: ['customer', 'activity', 'duration', 'date/time']
            };
            const csvData = gridApi.getDataAsCsv(params);
            const modifiedCsvData = csvData || '';
            const link = document.createElement('a');
            link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(modifiedCsvData));
            link.setAttribute('download', params.fileName);
            link.click();
        }
    };
    const columns = [
        { field: 'customer', sortable: true, filter: "agTextColumnFilter" },
        { field: 'activity', sortable: true, filter: true },
        { field: 'duration', sortable: true, filter: "agNumberColumnFilter" },
        {
            field: 'date/time',
            sortable: true,
            filter: true,
            valueGetter: (params: ValueGetterParams) => {
                const date = new Date(params.data.date);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const formattedDate = date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
                return `${formattedDate}, ${hours}:${minutes}`;
            },

        },
        {
            field: 'id',
            headerName: '',
            cellRendererFramework: (params: any) => (
                <Button
                    variant='text' style={{ color: 'red' }}
                    onClick={() => {
                        props.deleteTraining(params.value);
                    }}>Delete</Button>
            ),
        },
    ]


    const rows = props.list.map(training => {
        return {
            activity: training.activity,
            customer: training.customer ? `${training.customer.firstname}  ${training.customer.lastname}` : '',
            duration: training.duration,
            date: training.date,
            id: training.id
        };
    });

    return (
        <div className="ag-theme-alpine-dark" style={{ height: '100vh', width: '100%' }}>
            <button onClick={handleExportButtonClick}>Export to CSV</button>
            <AgGridReact columnDefs={columns} rowData={rows} onGridReady={onGridReady} />
        </div>
    )
}
