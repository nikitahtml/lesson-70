import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addContact } from '../redux/slices/contactsSlice';

interface Contact {
    name: string;
    phone: string;
    email: string;
    photo: string;
}

const AddContactPage: React.FC = () => {
    const [contact, setContact] = useState<Contact>({
        name: '',
        phone: '',
        email: '',
        photo: '',
    });
    const [preview, setPreview] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'photo') {
            setPreview(value);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(addContact({ ...contact, id: '' }));
        navigate('/');
    };

    return (
        <div>
            <h1>Add New Contact</h1>
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
                        onChange={handleChange}
                    />
                    {preview && <img src={preview} alt="Preview" width={100} />}
                </label>
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};

export default AddContactPage;
