import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Customer } from './CustomerDef';


interface AddCustomerProps {
    open: boolean;
    onClose: () => void;
    addCustomer: (customer: Customer) => void;
}

export const Addcustomer: React.FC<AddCustomerProps> = (props: AddCustomerProps) => {
    const [open, setOpen] = useState(props.open);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    })


    const handleClickClose = () => {
        props.onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;

        if (value !== null) {
            setCustomer({ ...customer, [name]: value });
        }
    };

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const save = () => {
        if (Object.values(customer).some(val => val === '')) {
            // If any of the input values are empty, show an error message
            alert('Please fill in all the fields.');
            return;
        }
        setCustomer({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            streetaddress: '',
            postcode: '',
            city: ''
        });
        props.onClose();
        props.addCustomer(customer);
    };

    return (
        <div>
            <Dialog open={open} onClose={props.onClose}>
                <DialogTitle>New customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>Creates a new customer in the database</DialogContentText>
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
                        label="postcode"
                        type="postcode"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        label="city"
                        type="city"
                        fullWidth
                        variant="standard"
                        required
                    />
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
        </div>
    );
};
