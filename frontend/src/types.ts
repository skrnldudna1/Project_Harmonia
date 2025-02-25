export type CarResponse = {
    brand: string;
    model: string;
    color: string;
    registrationNumber: string;
    modelYear: number;
    price: number;
    _links: {
        self: {
            href: string;
        }, car: {
            href: string;
        },
        owner: {
            href: string;
        }
    };
}

// 차량 정보를 나타내는 TypeScript 타입 정의
export type Car = {
    brand: string; // 차량 브랜드
    model: string; // 차량 모델
    color: string; // 차량 색상
    registrationNumber: string; // 차량 등록 번호
    modelYear: number; // 차량 연식 
    price: number; // 차량 가격 
};

export type CarEntry = {
    car : Car;
    url: string;
}
