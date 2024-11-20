'use client'
import Button from "@/ui/atoms/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components"
import { CustomSession } from "@/app/api/auth";
import { SlArrowDown } from "react-icons/sl";
import { BiSolidReport } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import Modal from "@/ui/atoms/modal";
import RegisterForm from "../formProjects/RegisterForm";

const Header = styled.header`
    background-color: white;
    width: 83vw;
    height: 10vh;
    display: flex;
    padding: 10px;
`;

const Titles = styled.div`
    width: 50%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
`;

const NameSection = styled.h2`
    color: #141414;
`;

const Buttons = styled.div`
    width: 50%; 
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
`;

const DownloadRport = styled(Button)`
    width: 200px;  
    background-color: #141414;
    color: white;
    border: none;
    padding: 10px 10px;
    cursor: pointer;
`;

const NewProyecto = styled(Button)`
    width: 200px;    
    background-color: #141414;
    color: white;
    border: none;
    padding: 10px 10px;
    cursor: pointer;
`;

const Profiler = styled.button`
    width: 250px;    
    background-color: white;
    color: black;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
    width: 35px;
    height: 35px;
`;

const PName = styled.p`
    width: auto;
    margin-right: 5px;
`;

export default function HeaderDashboard() {
    const [ModalOpenRegister, setModalOpenRegister] = useState(false);
    const { data } = useSession();
    const session = data as CustomSession;

    const toggleModalRegister = () => {
        setModalOpenRegister(!ModalOpenRegister);
    }

    const handleAdd = () => {
        toggleModalRegister();
    }

    const handleDownload = async () => {
        try {
            const response = await fetch(`/api/projects/report`, {
                method: "GET",
            });
    
            if (!response.ok) {
                throw new Error("Error al descargar");
            }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
    
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "reporte_proyectos.xlsx"); 
            document.body.appendChild(link);
            link.click();
    
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
            window.URL.revokeObjectURL(url);
    
            alert("Descarga completa");
    
        } catch (error) {
            console.error("Error en la descarga:", error);
            throw error;
        }
    };
    
    return (
        <Header>
            <Titles>
                <NameSection>Dashboard de Proyectos</NameSection>
            </Titles>
            <Buttons>
                <DownloadRport label='Descargar Reporte' icon={<BiSolidReport size={20}/>} onClick={handleDownload}/>
                <NewProyecto label="Nuevo proyecto" icon={<IoIosAddCircleOutline size={20}/>} onClick={handleAdd}/>
                <Profiler>
                    {session?.user?.photo ? (
                        <ProfileImage src={session.user.photo} alt="Profile Image" width={30} height={30} />
                    ) : (
                        <ProfileImage src="/avatar.png" alt="Profile Image" width={30} height={30} />
                    )}
                    <PName>{session?.user?.email || 'Name'}</PName>
                    <SlArrowDown />
                </Profiler>
            </Buttons>
            <Modal isOpen={ModalOpenRegister} onClose={toggleModalRegister} title="Agregar Proyecto">
                <RegisterForm onClose={toggleModalRegister} />
            </Modal>
        </Header>
    )
}
