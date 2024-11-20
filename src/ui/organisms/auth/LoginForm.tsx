'use client'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styled from "styled-components";
import Button from "@/ui/atoms/button";
import { signIn } from "next-auth/react";
import { ErrorResponse, FieldError } from "@/app/core/application/dto/common/error-response.dto";
import { useRouter } from "next/navigation";
import FormField from "@/ui/molecules/FormField";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email invalido')
        .required('Email Requerido'),
    password: yup
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('Contraseña Requerida'),
});


const FormContainer = styled.form`
    width: 100%;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    `;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    color: #1f1f1f;
    `;

const InstructionText = styled.p`
    text-align: center;
    font-size: 13px;    
    margin-bottom: 1rem;
    color: #666666;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ButtonForgotPassword = styled(Button)`
    font-size: 15px;
    background-color: transparent;
    border: none;
    color: #0c8eff;
    &:hover {
        background-color: transparent;
    }
`;

const DivButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PText = styled.p`
    font-size: 15px;
    color: #161616;
    margin-right: 3px;
`;

const ButtonRegister = styled(Button)`
    font-size: 15px;
    width: auto;
    padding: 0;
    background-color: transparent;
    border: none;
    color: #0c8eff;
    &:hover {
        background-color: transparent;
    }
`;
const LoginForm = () => {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema)
    });

    const handleLogin = async (data: ILoginRequest) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password
            })

            if (result?.error) {
                console.log("ocurio un error", JSON.parse(result.error));
                handleError(JSON.parse(result.error));
                return
            }

            router.push("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }

    const handleError = (error: unknown) => {
        const errorData = error as ErrorResponse
        if (errorData.errors && errorData) {
            if (Array.isArray(errorData.errors) && "field" in errorData.errors[0]) {
                errorData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as FieldError;
                    setError(field as keyof ILoginRequest, { message: error });
                });
            } else {
                if ("message" in errorData.errors[0]) {
                    setError("email", {
                        message: errorData.errors[0].message
                    })
                }
            }
        };
    };


    return (
        <FormContainer onSubmit={handleSubmit(handleLogin)}>
            <Title>Iniciar Sesión</Title>
            <InstructionText>Ingresa tus credenciales para acceder a tu cuenta</InstructionText>
            <FormField<ILoginRequest>
                control={control}
                type="email"
                name="email"
                label="Correo Electrónico"
                error={errors.email}
                placeholder="Ingrese Correo Electrónico"
            />
            <FormField<ILoginRequest>
                control={control}
                type="password"
                name="password"
                label="Contraseña"
                error={errors.password}
                placeholder="Ingrese Contraseña"
            />
            <Button type="submit" label="Iniciar Sesión" />
            <Buttons>
                <ButtonForgotPassword label="¿Olvidaste tu Contraseña?" />
                <DivButton>
                    <PText>¿No tienes una cuenta? </PText>
                    <ButtonRegister label="Registrate Aqui" />
                </DivButton>
            </Buttons>
        </FormContainer>
    );
};

export default LoginForm;
