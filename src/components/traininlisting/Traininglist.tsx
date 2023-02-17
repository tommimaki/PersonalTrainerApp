import React, { useEffect, useState } from "react";
import { Training } from "./Training";
import { Trainingtable } from './Trainingtable';
import { AddTraining } from './Addtraining';
import { Button } from "@mui/material";



export const Traininglist = () => {

    const [addTrainingDialogOpen, setAddTrainingDialogOpen] = useState(false);
    const [trainingList, setTrainingList] = useState<Object[]>([]);
    const [gridApi, setGridApi] = useState(null);
    function fetchTrainings(): Promise<Training[]> {

        let url = 'https://traineeapp.azurewebsites.net/gettrainings'
        return fetch(url)
            .then(response => response.json())
            .then(data => data)
            .catch((error) => {
                console.log(error)
                return [];
            });
    }


    function addTraining(training: object) {
        let url = 'https://traineeapp.azurewebsites.net/api/trainings'

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                fetchTrainings().then(data => setTrainingList(data))
            })
            .catch(error => console.log(error))
    }


    function deleteTraining(id: number) {
        console.log('deleteTraining called with id:', id);
        if (window.confirm('Would you like to delete the selected training?')) {
            fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete training.');
                    }
                    fetchTrainings().then(data => setTrainingList(data))
                })
                .catch(error => console.log(error))
        }
    }

    function updateTraining(training: Training, link: string) {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                fetchTrainings().then(data => setTrainingList(data))
            })
            .catch(error => console.log(error))
    }



    useEffect(() => {
        fetchTrainings().then(data => setTrainingList(data))
    }, [])

    return (
        <div>


            <Button onClick={() => setAddTrainingDialogOpen(true)}> add training</Button>
            <AddTraining open={addTrainingDialogOpen} addTraining={addTraining} onClose={() => { setAddTrainingDialogOpen(false) }} />
            <Trainingtable list={trainingList} deleteTraining={deleteTraining} />
        </div>
    )
}


