import { CarResponse, Car, CarEntry } from "../types";
import axios, { AxiosRequestConfig} from 'axios';



export const getCars = async (): Promise<CarResponse[]> => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cars`,getAxiosConfig());

    return response.data._embedded.cars;
};


//삭제 버튼
// 지정된 link URL로 delete 요청을 보내고, 서버에서 반환된 데이터를 CarResponse[]타입으로
// 반환하는 역할을 한다.
export const deleteCar = async (link: string): Promise<CarResponse[]> =>{
    const response = await axios.delete(link,getAxiosConfig())
    return response.data
}

// 새 자동차 추가
export const addCar = async (car : Car) : Promise<CarResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car,
        getAxiosConfig());

    return response.data;
}

export const updateCar = async (carEntry: CarEntry):
Promise<CarResponse> =>{
    const response = await axios.put(carEntry.url, carEntry.car, 
        getAxiosConfig());
    return response.data;
}

// 중복 코드 리팩터링하기
const getAxiosConfig = () : AxiosRequestConfig => {
    const token = sessionStorage.getItem("jwt");

    return {
        headers: {
            'Authorization' :token,
            'Content-Type': 'application/json',
        },
    };
};