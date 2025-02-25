//import { CarResponse } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import { Snackbar } from "@mui/material";
import { useState } from 'react';
import Addcar from './AddCar';
import EditCar from "./EditCar";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Carlist() {

    const [open, setOpen] = useState(false);

    const QueryClient = useQueryClient();

    const {mutate} = useMutation(deleteCar, {
        onSuccess: () => {
            setOpen(true);
            QueryClient.invalidateQueries({queryKey: ['cars']}); // 새로고침 없이 바로 삭제
            // 자동차 삭제 이후 실행되는 로직
        },
        onError: (err) => {
            console.error(err);
        }
    })

    const columns: GridColDef[] = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'registrationNumber', headerName: 'Reg.nr', width: 150},
        {field: 'modelYear', headerName: 'Model Year', width: 150},
        {field: 'price', headerName: 'Price', width: 150},
        {
            field: 'edit', //수정
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditCar cardata={params.row}/>
        },
        {
            field: 'delete', //삭제
            headerName: '',
            width: 90,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams)=> (
                <IconButton aria-label="delete" size="small"
                onClick={() => {
                    // 사용자가 삭제 확인 창에서 "확인(OK)"을 누르면 삭제 요청 실행
                    if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
                        mutate(params.row._links.car.href);
                    }
                }}> <DeleteIcon fontSize="small" />
                </IconButton>
            ),
        },

    ];

    const { data, error, isSuccess } = useQuery({
        queryKey: ["cars"],
        queryFn: getCars
    });

    if(!isSuccess){
        return <span>Loading...</span>
    }else if (error) {
        return <span>Error when fetching cars...</span>
    }else{
        return(
            <>
            <Addcar />
           <DataGrid
             rows={data}
             columns={columns} 
             getRowId={row => row._links.self.href}
             slots={{toolbar: GridToolbar}}
             />
            <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={()=> setOpen(false)}
            message="Car deleted"/>
            </>
        );
    }   
}

export default Carlist