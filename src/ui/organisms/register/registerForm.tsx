'use client'
import Button from "@/ui/atoms/button";
import FormField from "@/ui/molecules/FormField";
import { FormFileField } from "@/ui/molecules/FormFileField";
import { FormSelectField } from "@/ui/molecules/FormSelectField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";


const registerSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('Email requerido'),
    password: yup
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('Contraseña requerida'),
    name: yup
        .string()
        .min(1, 'El nombre de usuario debe tener al menos 1 caracter')
        .required('Nombre de usuario requerido'),
    role: yup
        .string()
        .required('Rol requerido'),
    photo: yup
        .mixed<File>()
        .nullable()
        .notRequired()
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
    color: #202020;
`;

const InputsSelects = styled.div`
    display: flex; 
`;

const RegisterForm = () => {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<IRegisterRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema)
    });

    const handleRegister = async (data: IRegisterRequest) => {
        try {
            const formData = new FormData();

            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("name", data.name);
            formData.append("role", data.role);

            if (data.photo instanceof File) {
                formData.append("photo", data.photo);
            } else {
                console.warn("La imagen no es un archivo válido");
            }
            
            const response = await fetch("/api/users/post", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Error al registrar el servicio");
            }
            alert('Usuario registrado exitosamente');
            router.refresh();
            console.log(response);
            return await response.json();

        } catch (error) {
            console.error("Error en el POST:", error);
            throw error;
        }
    };


    return (
        <FormContainer onSubmit={handleSubmit(handleRegister)}>
            <Title>Registro</Title>

            <FormField<IRegisterRequest>
                control={control}
                type="email"
                name="email"
                label="Email"
                error={errors.email}
                placeholder="Ingrese Email"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="password"
                name="password"
                label="Contraseña"
                error={errors.password}
                placeholder="Ingrese Contraseña"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="text"
                name="name"
                label="Nombre"
                error={errors.name}
                placeholder="Ingrese Nombre"
            />

            <InputsSelects>
                <FormSelectField<IRegisterRequest>
                    control={control}
                    options={[
                        { value: "organizer", label: "Organizador" },
                        { value: "user", label: "Usuario" }
                    ]}
                    name="role"
                    label="Rol"
                    error={errors.role}
                    placeholder="Ingrese Rol"
                />

                <FormFileField<IRegisterRequest>
                    control={control}
                    name="photo"
                    label="Foto de Perfil"
                    error={errors.photo}
                />
            </InputsSelects>
            <Button type="submit" label="Registrarse" />
        </FormContainer>
    );
};

export default RegisterForm;