import { useState } from "react";
import axios from 'axios';


export default function Contact() {
    const [status, setStatus] = useState('Submit')

    //Form values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...')
        let payload = {
            name: name,
            email: email,
            message: message
        }
        axios.post('/api/email/contact', JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(res => {
            setStatus('Success');
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="name" required
                    value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <textarea type="text" placeholder="message" required
                    value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">{status}</button>
            </form>
        </div>
    )
}