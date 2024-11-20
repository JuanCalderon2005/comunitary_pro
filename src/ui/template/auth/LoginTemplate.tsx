'use client'
import LoginForm from "@/ui/organisms/auth/LoginForm";
import styled from "styled-components";
import Button from "@/ui/atoms/button";
import { useRouter } from "next/navigation";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100;
    height: 100vh;
    background-image: linear-gradient(to bottom, #e6f0ff, #ffffff); 
`;

const ReturnhomePage = styled.div`
     width: 100%;
     height: 10vh;
     display: flex;
     align-items: center;
     justify-content: left;
`;

const ButtonP = styled(Button)`
    font-size: 20px;
    width: 200px;
    border: none;
    color: #0c8eff;
    background-color: transparent;

    &:hover {
        background-color: transparent;
    }
`;

const ContainerLogin = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const CardContainer = styled.div`
    width: 100%;
    max-width: 28rem; 
    padding: 1.5rem; 
    background-color: white;
    border-radius: 0.5rem; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
`;

export default function LoginTemplate() {
    const router = useRouter();

    const HandleBack = () => {
        router.push("/");
    };
    
    return (
        <PageContainer>
            <ReturnhomePage>
                <ButtonP label="Volver al inicio" onClick={HandleBack}/>
            </ReturnhomePage>
            <ContainerLogin>
                <CardContainer>
                    <LoginForm />
                </CardContainer>
            </ContainerLogin>
        </PageContainer>
    );
};
