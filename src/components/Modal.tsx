import React from 'react';
import { Link } from 'react-router-dom';

interface ModalProps {
    contact: {
        id: number;
        name: string;
        phone: string;
        email: string;
        photo: string;
    };
    onClose: () => void;
    onDelete: (id: number) => void;
}

const Modal: React.FC<ModalProps> = ({ contact, onClose, onDelete }) => (
    <div className="modal">
        <button onClick={onClose}>Close</button>
        <h2>{contact.name}</h2>
        <img src={contact.photo} alt={contact.name} width={100} />
        <p>Phone: {contact.phone}</p>
        <p>Email: {contact.email}</p>
        <Link to={`/edit/${contact.id}`}>Edit</Link>
        <button onClick={() => onDelete(contact.id)}>Delete</button>
    </div>
);

export default Modal;
