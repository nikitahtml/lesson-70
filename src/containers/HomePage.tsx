import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchContacts, deleteContact } from '../redux/slices/contactsSlice';
import ContactList from '../components/ContactList';
import Modal from '../components/Modal';

const HomePage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { contacts, status } = useSelector((state: RootState) => state.contacts);
    const [selectedContact, setSelectedContact] = React.useState<any>(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchContacts());
        }
    }, [dispatch, status]);

    const handleContactClick = (id: string) => {
        const contact = contacts.find(c => c.id === id);
        if (contact) setSelectedContact(contact);
    };

    const handleCloseModal = () => {
        setSelectedContact(null);
    };

    const handleDeleteContact = (id: string) => {
        dispatch(deleteContact(id));
        setSelectedContact(null);
    };

    return (
        <div>
            <h1>Contact List</h1>
            <Link to="/add">Add new contact</Link>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && (
                <ContactList contacts={contacts} onContactClick={handleContactClick} />
            )}
            {selectedContact && (
                <Modal
                    contact={selectedContact}
                    onClose={handleCloseModal}
                    onDelete={handleDeleteContact}
                />
            )}
        </div>
    );
};


export default HomePage;
