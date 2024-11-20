'use client'
import styled from "styled-components";
import { Suspense } from "react";
import Loading from "@/ui/atoms/loading";
import HeaderDashboard from "@/ui/organisms/dashboard/header";
import SidebarDashboard from "@/ui/organisms/dashboard/sidebar";

interface ILayout {
    children: React.ReactNode;
}

const StylesLayout = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
    background-color: white;
`;

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex-grow: 1; /* Ocupa todo el espacio restante */
    background-color: #8b8a8a;
`;

export default function Layout({ children }: ILayout) {
    return (
        <StylesLayout>
            <SidebarDashboard />
            <StyledMain>
                <Suspense fallback={<Loading />}>
                    <HeaderDashboard />
                    {children}
                </Suspense>
            </StyledMain>
        </StylesLayout>
    )
}
