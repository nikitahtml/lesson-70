import React from 'react';

interface ContactCardProps {
    contact: {
        id: number;
        name: string;
        phone: string;
        email: string;
        photo: string;
    };
    onClick: (id: number) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onClick }) => (
    <div onClick={() => onClick(contact.id)}>
        <img src={contact.photo} alt={contact.name} width={50} />
        <div>{contact.name}</div>
        <div>{contact.phone}</div>
    </div>
);

export default ContactCard;
