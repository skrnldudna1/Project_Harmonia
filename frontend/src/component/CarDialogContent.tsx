import { DialogContent } from "@mui/material";
import { Car } from "../types";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';


type DialogFormProps = {
    car : Car;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>
    void;
}


function CarDialogContent({ car, handleChange}: DialogFormProps) {
    return (
        <DialogContent>
            <Stack spacing={2} mt={1}>

        {/* 브랜드 입력 필드 */}
        <TextField label="Brand" 
            name="brand" 
            value={car.brand} 
            onChange={handleChange} 
        /><br/>

        {/* 모델 입력 필드 */}
        <TextField label="Model" 
            name="model" 
            value={car.model} 
            onChange={handleChange} 
        /><br/>

        {/* 색상 입력 필드 */}
        <TextField label="Color" 
            name="color" 
            value={car.color} 
            onChange={handleChange} 
        /><br/>

        {/* 연식 입력 필드 */}
        <TextField label="Year" 
            name="modelYear" 
            value={car.modelYear} 
            onChange={handleChange} 
        /><br/>

        {/* 차량 등록번호 입력 필드 */}
        <TextField label="Reg.nr" 
            name="registrationNumber" 
            value={car.registrationNumber} 
            onChange={handleChange} 
        /><br/>

        {/* 가격 입력 필드 */}
        <TextField label="Price" 
            name="price" 
            value={car.price} 
            onChange={handleChange} 
        /><br/>
        </Stack>
    </DialogContent>
     
    );
}

export default CarDialogContent;