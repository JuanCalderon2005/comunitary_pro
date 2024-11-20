import Button from "@/ui/atoms/button";
import FormField from "@/ui/molecules/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

interface Iprops {
    onClose: () => void;
}

const registerSchema = yup.object().shape({
    title: yup
        .string()
        .min(1, 'El título debe tener al menos 1 caracter')
        .required('Título del proyecto requerido'),
    description: yup
        .string()
        .min(1, 'La descripción debe tener al menos 1 caracter')
        .required('Descripción requerida'),
    startDate: yup
        .string()
        .required('Fecha de inicio requerida')
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            'La fecha debe tener el formato YYYY-MM-DD'
        ),
    endDate: yup
        .string()
        .required('Fecha de finalización requerida')
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            'La fecha debe tener el formato YYYY-MM-DD'
        ),
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
    color: #2a2a2a;
`;

const RegisterForm = ({ onClose }: Iprops) => {
    const router = useRouter();
    const {
        control,
        handleSubmit: onSubmit,
        formState: { errors },
    } = useForm<IRegisterProjectsRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema),
    });

    const handleRegister = async (data: IRegisterProjectsRequest) => {
        try {
            const response = await fetch("/api/projects/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Error al registrar el proyecto");
            }

            alert('Proyecto registrado exitosamente');
            router.refresh();
            onClose();
            return await response.json();
            
        } catch (error) {
            console.error("Error en el POST:", error);
            throw error;
        }
    };

    return (
        <FormContainer onSubmit={onSubmit(handleRegister)}>
            <Title>Registro de Proyecto</Title>

            <FormField<IRegisterProjectsRequest>
                control={control}
                type="text"
                name="title"
                label="Título del Proyecto"
                error={errors.title}
                placeholder="Ingrese el título del proyecto"
            />

            <FormField<IRegisterProjectsRequest>
                control={control}
                type="text"
                name="description"
                label="Descripción"
                error={errors.description}
                placeholder="Ingrese la descripción"
            />

            <FormField<IRegisterProjectsRequest>
                control={control}
                type="date"
                name="startDate"
                label="Fecha de Inicio"
                error={errors.startDate}
            />

            <FormField<IRegisterProjectsRequest>
                control={control}
                type="date"
                name="endDate"
                label="Fecha de Finalización"
                error={errors.endDate}
            />

            <Button type="submit" label="Registrar" />
        </FormContainer>
    );
};

export default RegisterForm;
