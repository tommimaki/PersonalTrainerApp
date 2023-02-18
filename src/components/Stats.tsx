import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { fetchTrainings } from './api/api';





ChartJS.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend

)

interface Training {
    id: number;
    date: Date;
    duration: number;
    activity: string;
    customer: {
        id: number;
        firstname: string;
        lastname: string;
        streetaddress: string;
        postcode: string;
        city: string;
        email: string;
        phone: string;
    }
}


const Stats = () => {
    const [trainingData, setTrainingdata] = useState<Training[]>([])


    const activities: { [key: string]: number } = trainingData.reduce((acc: { [key: string]: number }, curr) => {
        const { activity, duration } = curr;
        if (activity in acc) {
            acc[activity] += duration;
        } else {
            acc[activity] = duration;
        }
        return acc;
    }, {});

    const activityNames = Object.keys(activities);

    const data = {
        labels: activityNames,
        datasets: [
            {
                label: 'duration',
                // data: trainingData.map(training => training.duration),
                data: Object.values(activities),
                backgroundColor: 'grey',
                borderColor: 'black',
                borderWidth: 1,
            },
        ]
    }

    const options = {



    }

    useEffect(() => {
        fetchTrainings().then(data => setTrainingdata(data))
    }, [])
    return (
        <div>
            <h1> stats</h1>
            <div>
                <Bar
                    data={data}
                    options={options}
                >
                </Bar>

            </div>

        </div>
    )
};

export default Stats;
