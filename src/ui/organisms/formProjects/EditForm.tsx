import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/ui/atoms/button";
import styled from "styled-components";
import * as yup from "yup";
import Loading from "@/ui/atoms/loading";
import { useRouter } from "next/navigation";
import FormField from "@/ui/molecules/FormField";

interface Iprops {
    onClose: () => void;
    Id: number;
}

// Definimos el esquema de validación para los proyectos
const editProjectSchema = yup.object().shape({
    title: yup.string().min(1, 'El título debe tener al menos 1 carácter').required('Título del proyecto requerido'),
    description: yup.string().min(1, 'La descripción debe tener al menos 1 carácter').required('Descripción requerida'),
    startDate: yup.string().required('Fecha de inicio requerida'),
    endDate: yup.string().required('Fecha de finalización requerida')
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
  color: black;
`;

const EditForm = ({ onClose, Id }: Iprops) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { control, handleSubmit: onSubmit, setValue, formState: { errors } } = useForm<IEditProjectsRequest>({
        mode: "onChange",
        resolver: yupResolver(editProjectSchema),
    });

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/projects/getproject/${Id}`);
                const data = await response.json();
                const project = data.data;
                setValue("title", project.title);
                setValue("description", project.description);
                setValue("startDate", project.startDate);
                setValue("endDate", project.endDate);
            } catch (error) {
                console.error("Error fetching project data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjectData();
    }, [Id, setValue]);

    const handleEdit = async (data: IEditProjectsRequest) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/projects/edit/${Id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el proyecto");
            }

            alert("Proyecto actualizado exitosamente");
            router.refresh();
            onClose();
        } catch (error) {
            console.error("Error en el PUT:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer onSubmit={onSubmit(handleEdit)}>
            <Title>Editar Proyecto</Title>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <FormField<IEditProjectsRequest>
                        control={control}
                        type="text"
                        name="title"
                        label="Título del Proyecto"
                        error={errors.title}
                        placeholder="Ingrese el título del proyecto"
                    />

                    <FormField<IEditProjectsRequest>
                        control={control}
                        type="text"
                        name="description"
                        label="Descripción"
                        error={errors.description}
                        placeholder="Ingrese la descripción del proyecto"
                    />

                    <FormField<IEditProjectsRequest>
                        control={control}
                        type="date"
                        name="startDate"
                        label="Fecha de Inicio"
                        error={errors.startDate}
                        placeholder="Seleccione la fecha de inicio"
                    />

                    <FormField<IEditProjectsRequest>
                        control={control}
                        type="date"
                        name="endDate"
                        label="Fecha de Finalización"
                        error={errors.endDate}
                        placeholder="Seleccione la fecha de finalización"
                    />

                    <Button type="submit" label="Actualizar Proyecto" />
                </>
            )}
        </FormContainer>
    );
};

export default EditForm;
