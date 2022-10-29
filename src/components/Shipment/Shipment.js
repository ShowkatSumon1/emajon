import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loginUser, setLoginUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        
        <form className='shipment-form' onSubmit={handleSubmit(onSubmit)}>
            
            <input defaultValue={loginUser.email} {...register("email", { required: true })}  placeholder='Your email' />
            {errors.email && <span className='shipment-error'>This field is required</span>}

            <input defaultValue={loginUser.name} {...register("name", { required: true })}  placeholder='Your Name' />
            {errors.name && <span className='shipment-error'>This field is required</span>}

            <input {...register("address", { required: true })}  placeholder='Your Address' />
            {errors.address && <span className='shipment-error'>This field is required</span>}

            <input type="submit" />
        </form>
    )
}

export default Shipment;