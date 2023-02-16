import React, { useEffect, useState } from "react";
import { Training } from "./Training";
import { Trainingtable } from './Trainingtable';



export const Traininglist = () => {

    const [trainingList, setTrainingList] = useState<Object[]>([]);
    function fetchCustomers(): Promise<Training[]> {

        let url = 'https://traineeapp.azurewebsites.net/gettrainings'
        return fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch((error) => {
                console.log(error)
                return [];
            });
    }

    useEffect(() => {
        fetchCustomers().then(data => setTrainingList(data))
    }, [])

    return (
        <div>
            <Trainingtable list={trainingList} />
        </div>
    )
}


