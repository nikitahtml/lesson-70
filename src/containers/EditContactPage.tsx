import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchContacts, updateContact } from '../redux/slices/contactsSlice';

interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
}

const EditContactPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { contacts } = useSelector((state: RootState) => state.contacts);
    const [contact, setContact] = useState<Contact | null>(null);
    const [preview, setPreview] = useState<string>('');

    useEffect(() => {
        if (id) {
            const contactToEdit = contacts.find(contact => contact.id === id);
            if (contactToEdit) {
                setContact(contactToEdit);
                setPreview(contactToEdit.photo);
            } else {
                dispatch(fetchContacts());
            }
        }
    }, [id, contacts, dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (contact) {
            dispatch(updateContact(contact));
            navigate('/');
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        if (contact) {
            setContact({ ...contact, photo: url });
            setPreview(url);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (contact) {
            setContact({ ...contact, [name]: value });
        }
    };

    if (!contact) return <p>Loading...</p>;

    return (
        <div>
            <h1>Edit Contact</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Photo URL:
                    <input
                        type="text"
                        name="photo"
                        value={contact.photo}
                        onChange={handlePhotoChange}
                    />
                    {preview && <img src={preview} alt="Preview" width={100} />}
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditContactPage;
