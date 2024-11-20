"use client";

import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import styled from "styled-components";

interface IPropsSelectFile<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  id?: string;
  accept?: string;
}

const FormFileFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #202020;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  border: 1px solid ${({ hasError }) => (hasError ? "#f08484" : "#e2e8f0")};
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #202020;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const ErrorText = styled.span`
  color: #f79393;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const FormFileField = <T extends FieldValues>({
  label,
  name,
  control,
  error,
  id,
  accept,
}: IPropsSelectFile<T>) => {
  return (
    <FormFileFieldContainer>
      <Label htmlFor={id || label.toLowerCase()}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <StyledInput
            type="file"
            id={id || label.toLowerCase()}
            hasError={!!error}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              field.onChange(file); 
            }}
            accept={accept}
          />
        )}
      />
      {error && <ErrorText>{error.message}</ErrorText>}
    </FormFileFieldContainer>
  );
};
