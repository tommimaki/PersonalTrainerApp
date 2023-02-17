

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { fetchCustomers } from '../api/api';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';




interface AddTrainingProps {
    open: boolean;
    onClose: () => void;
    addTraining: (training: object) => void;
}

export const AddTraining: React.FC<AddTrainingProps> = (props: AddTrainingProps) => {
    const [open, setOpen] = useState(props.open);
    const [customerList, setCustomerList] = useState<any>([]);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: ''
    })

    const activities = [
        "Gym Training",
        "Zumba",
        "Jogging",
        "Spinning",
        "Fitness",
        "Crossfit",
        "Other",
    ]

    const handleClickClose = () => {
        props.onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;

        if (value !== null) {
            setTraining({ ...training, [name]: value });
        }
    };

    const save = () => {
        if (Object.values(training).some(val => val === '')) {
            // If any of the input values are empty, show an error message
            alert('Please fill in all the fields.');
            return;
        }
        setTraining({
            date: '',
            duration: '',
            activity: '',
            customer: ''
        });
        props.onClose();
        props.addTraining(training);
    };

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    useEffect(() => {
        fetchCustomers().then((customers) => {
            setCustomerList(customers)
        })
    }, [])
    const handleDateChange = (value: any) => {
        setTraining({ ...training, date: value })
    }

    return (
        <div>
            <Dialog open={open} onClose={props.onClose}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    <DialogContentText>Creates a new training in the database</DialogContentText>

                    <br></br>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date and Time"
                            value={training.date}
                            onChange={handleDateChange}
                        />
                    </LocalizationProvider>

                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        label="Duration (minutes)"
                        type="number"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <InputLabel>Activity</InputLabel>
                    <Select
                        name="activity"
                        id="activity"
                        label="Activity"
                        placeholder="Test"
                        value={training.activity}
                        onChange={(e: any) => handleInputChange(e)}
                        fullWidth
                    >
                        <MenuItem value="">
                            <em>Select activity</em>
                        </MenuItem>
                        {activities.map(activity => {
                            return <MenuItem value={activity}>{activity}</MenuItem>;
                        })}
                    </Select>

                    <InputLabel>Customer</InputLabel>
                    <Select
                        name="customer"
                        id="customer"
                        value={training.customer}
                        label="Customer"
                        onChange={(e: any) => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    >
                        <MenuItem value="">
                            <em>Select customer</em>
                        </MenuItem>
                        {customerList.map((customer: any) => {
                            return <MenuItem value={customer.links[0].href}>{customer.firstname} {customer.lastname}</MenuItem>;
                        })}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={save}>
                        Add
                    </Button>
                    <Button onClick={handleClickClose} variant="outlined" style={{ color: 'red' }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};
