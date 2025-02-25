import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe , test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Carlist from './component/Carlist';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({
    children } : {children: React.ReactNode }) => (
        <QueryClientProvider client = {
            queryClient}>{children}
            </QueryClientProvider>);

describe("Carlist test", () => {
    // 테스트 케이스 코드
   test("component renders", () => {
    render(<Carlist />,{ wrapper });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    })
    
});

test("Cars are fetched", async () => {
    render(<Carlist />, { wrapper});

    await waitFor(() => screen.getByText (/New Car/i));
    expect(screen.getByText(/Ford/i)).toBeInTheDocument();
})


// 테스트를 통한 이벤트 실행
test("Open new car modal", async () => {
    render(<Carlist />, { wrapper});

// getText 쿼리를 통해 버튼을 찾고 userEvent.click()함수를 이용하여 버튼을 누른다.
// 매처를 이용하여 문서에서 SAVE 버튼을 찾을 수 있는지 확인한다.
    await waitFor(() => screen.getByText (/New Car/i));
    await userEvent.click(screen.getByText(/New Car/i));
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
})
