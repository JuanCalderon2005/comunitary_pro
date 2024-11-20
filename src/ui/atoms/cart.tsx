'use client'
import styled from "styled-components"

interface IProps{
    title: string;
    icon: React.ReactNode;
    body: string | number;
}
const Cart = styled.div`
    width: 285px;
    height: 100px;
    display: flex;
    padding: 10px;
    flex-direction: column;
    background-color: white;
    border-radius: 7px;
`;

const Header = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 13px;
    color: #212121;
    font-weight: bold;
`;

const IconBase = styled.div`
    font-size: 10px;
`;

const Body = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    color: black;
    font-size: 25px;
    font-weight: bold;
    width: 100%;
    height: 70px;
`;

export default function CartInfo(
    {title,
     icon,
     body   
    }: IProps
){
    return(
        <Cart>
            <Header>
                <Title>{title}</Title>
                <IconBase>{icon}</IconBase>
            </Header>
            <Body>{body}</Body>
        </Cart>
    )
}