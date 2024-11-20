import React from 'react';
import styled from 'styled-components';

interface ITableProps {
  tbody: EventData[];
  onEdit?: (rowId: number) => void;
  onDelete?: (rowId: number) => void;
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  
  th, td {
    border-bottom: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    font-size: 13px;
  }
  
  th {
    background-color: transparent;
    color: #818181;
  }

  td {
    color: #4d4d4d;
  }

  td.Colum-Buttons {
    width: 180px;
    text-align: center;
  }

  td.Colum-title{
    font-weight: bold;
  }

  td.Colum-date {
    width: 110px;
  }

  .status {
  padding: 2px 6px;
  border-radius: 10px; 
  color: #3e3e3e87; 
  }

  .status.activo {
    background-color: #009d0041;
  }

  .status.inactivo {
    background-color: red;
  }
`;

const ActionButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &.edit {
    background-color: white;
    color: #191919;
    border: 1px solid #686868;
  }

  &.delete {
    background-color: #ff1100cf;
    color: white;
  }
`;

export default function TableComponent({ tbody, onEdit, onDelete }: ITableProps) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Descripcion</th>
          <th>Fecha de Inicio</th>
          <th>Fecha de Fin</th>
          <th>Estado</th>
          <th>Organizador</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tbody.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className='Colum-title'>{row.title}</td>
            <td>{row.description}</td>
            <td className='Colum-date'>{row.startDate}</td>
            <td className='Colum-date'>{row.endDate}</td>
            <td className="Colum-Status">
              <span className={`status ${row.isActive ? 'activo' : 'inactivo'}`}>
                {row.isActive ? 'Activo' : 'Inactivo'}
              </span>
            </td>
            <td>{row.organizer.name}</td>
            <td className="Colum-Buttons">
              <ActionButton
                className="edit"
                onClick={() => onEdit && onEdit(row.id)}
              >
                Editar
              </ActionButton>
              <ActionButton
                className="delete"
                onClick={() => onDelete && onDelete(row.id)}
              >
                Eliminar
              </ActionButton>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
