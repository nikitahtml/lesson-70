import React from 'react';
import ContactCard from './ContactCard';

interface Contact {
    id: number;
    name: string;
    phone: string;
    email: string;
    photo: string;
}

interface ContactListProps {
    contacts: Contact[];
    onContactClick: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onContactClick }) => {
    return (
        <div className="contact-list">
            {contacts.map((contact) => (
                <ContactCard
                    key={contact.id}
                    contact={contact}
                    onClick={() => onContactClick(contact.id)}
                />
            ))}
        </div>
    );
};

export default ContactList;
