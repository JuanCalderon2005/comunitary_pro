import Button from "@/ui/atoms/button";
import { useRouter } from "next/navigation";
import styled from "styled-components"


const BodyHomePageComponent = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: transparent;
`;

const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 0.5em;
    color: var(--color-primary);
`;

const Paragraph = styled.p`
    width: 50%;
    text-align: center;
    font-size: 1.5rem;
    color: var(--color-gray);
    margin-bottom: 1em;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
`;

const ButtonProyect = styled(Button)`
    padding: 10px 10px;
    width: 200px;
    height: 50px;
    margin-right: 0.5em;
    border: none;
    font-weight: bold;
`;

const ButtonOrganizator = styled(Button)`
    width: 250px;
    background-color: #ffff;
    color: #1e1e1e;
    margin-left: 0.5em;
    border-color: #c9c9c9;
    font-weight: bold;

    &:hover {
        background-color: #e1e1e1;
        color: #ffff;
    }
`;

export default function BodyHomePage() {

    const router = useRouter();
    const handleClickLogin = () => {
        router.push("/login");
    }

    return(
        <BodyHomePageComponent>
            <Title>
                Conecta, Colabora, Cambia el Mundo
            </Title>
            <Paragraph>
                Unete a nuestra comunidad de voluntarios y organizadores. Encuentra proyectos que te apasionen o crea los tuyos propios para hacer una diferencia en tu comunidad.
            </Paragraph>
            <Buttons>
                <ButtonProyect label="Explorar Proyectos"/>
                <ButtonOrganizator label="Comenzar como Organizador" onClick={handleClickLogin}/>
            </Buttons>
        </BodyHomePageComponent>
    )
}