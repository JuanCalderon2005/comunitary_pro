'use client'
import BodyHomePage from "@/ui/organisms/homePage/body";
import HeaderHomePage from "@/ui/organisms/homePage/header";
import styled from "styled-components"

const PageContainer = styled.div`
  width: 100;
  height: 100vh;
  background-image: linear-gradient(to bottom, #e6f0ff, #ffffff);
`;
export default function HomePage() {

    return (
        <PageContainer>
            <HeaderHomePage/>
            <BodyHomePage/>
        </PageContainer>
    )
}