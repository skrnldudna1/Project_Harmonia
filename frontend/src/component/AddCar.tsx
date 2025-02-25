
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCar } from '../api/carapi';
import { Car } from '../types';
import CarDialogContent from './CarDialogContent';
import { Button } from '@mui/material';


function AddCar() {

    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber:'',
        modelYear: 0,
        price: 0
    });

    const queryClient  = useQueryClient();

    const {mutate} = useMutation(addCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err)=> {
            console.error(err);
        },
    })

    //모달 폼 열기
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        setCar({...car, [event.target.name]:
            event.target.value});
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        mutate(car);
        setCar({ brand: '', model:'', color: '', registrationNumber:'',
            modelYear: 0, price: 0
        });
        handleClose();
    }
    
    return (
        <>
        <Button onClick={handleClickOpen}>New Car</Button>

        <Dialog open={open} onClose={handleClose}>
    {/* 다이얼로그 제목 */}
    <DialogTitle>New car</DialogTitle>
    <CarDialogContent car = {car} handleChange={handleChange}/>
    <DialogActions>
        {/* 버튼 */}
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>


    </DialogActions>
</Dialog>

        </>
    );
   
}

export default AddCar;