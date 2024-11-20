'use client'
import Button from "@/ui/atoms/button";
import { useRouter } from "next/navigation";
import styled from "styled-components"

const HeaderHomePageComponent = styled.header`
    width: 100%;
    height: 15vh;
    padding: 15px;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
    color: #3b6deb;
    font-size: 30px;
    font-weight: bold;
`;

const ButtonsContainer = styled.div`
    width: auto;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ButtonLogin = styled(Button)`
    font-size: 14px;
    width: 130px;
    height: 40px;
    background-color: transparent;
    color: #050505;
    border: none;
    font-weight: bold;

    &:hover {
        background-color: #e1e1e1;
        color: #ffff;
    }
`;

const ButtonRegister = styled(Button)`
    font-size: 14px;
    width: 100px;
    height: 40px;
    background-color: #050505;
    color: #ffff;
    border: none;
`;


export default function HeaderHomePage() {
    const router = useRouter();

    const handleClickLogin = () => {
        router.push("/login");
    }

    const handleClickregister = () => {
        router.push("/register");
    }
    
    return (
        <HeaderHomePageComponent>
            <Title>
                VolunteerConnect
            </Title>
            <ButtonsContainer>
                <ButtonLogin label="Iniciar Sesion" onClick={handleClickLogin} />
                <ButtonRegister label="Regístrarse" onClick={handleClickregister} />
            </ButtonsContainer>
        </HeaderHomePageComponent>
    )
}