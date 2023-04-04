import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Customer } from './CustomerDef';


interface EditCustomerProps {

    updateCustomer: (customer: Customer, link: string) => void;
    link: string;
    customer: Customer;
}

export const EditCustomer: React.FC<EditCustomerProps> = (props: EditCustomerProps) => {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState(props.customer);

    const handleClickClose = () => {
        setOpen(false);
    };


    const handleClickOpen = () => {
        console.log(props.customer);
        setOpen(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };


    const save = () => {
        if (Object.values(customer).some(val => val === '')) {
            // If any of the input values are empty, show an error message
            alert('Please fill in all the fields.');
            return;
        }
        props.updateCustomer(customer, props.link);
        handleClickClose();
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClickOpen}>
                <DialogTitle>Edit customer - {customer.firstname} {customer.lastname}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Modifies an existing customer in the database</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        label="First name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        label="Postcode"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={save}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}