import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { LinearGradient } from 'react-text-gradients';
import { useAppDispatch, useAppSelector } from '../store/types';
import { setAlert } from '../store/alertSlice';

const UserForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const alertMsgs = useAppSelector((state) => state.alert);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [currentAlertMsg, setCurrentAlertMsg] = useState<string>("");

    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('https://todoapp-react-redux.onrender.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setAlert({ message: "Form submitted successfully", type: "success" })
            setFormData({
                name: '',
                email: '',
                phone: '',
                city: '',
            });
            console.log(data); // Log response from server
        } catch (error) {
            console.error('Error:', error);
            // Dispatch an error alert message
            dispatch(
                setAlert({ message: "Error submitting form", type: "error" })
            );
        }
    };

    useEffect(() => {
        if (alertMsgs.length > 0) {
          setCurrentAlertMsg(alertMsgs[0].message); // Assuming only one message is shown at a time
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            setCurrentAlertMsg(""); // Clear the message after hiding the alert
          }, 3000); // Show alert for 3 seconds
        }
      }, [alertMsgs]);

    return (
        <>
            <h1 style={{ textAlign: "center" }}>
                <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
                 User Submit Form 
                </LinearGradient>
            </h1>

            <form className='inpCard' onSubmit={handleSubmit}>
                <input className='inpBox' type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input className='inpBox' type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input className='inpBox' type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
                <input className='inpBox' type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                <button className='inpBox' type="submit">Submit</button>
            </form>
            {showAlert && <div className="alertmsg">{currentAlertMsg}</div>}
        </>
    );
};

export default UserForm;

