
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth'

export const LoginScreen = () => {

    const { login } = useAuth();

    const [err, setErr] = useState(false);

    const handleLogin = async () => {
        const resp = await login();
        if( resp ){
            setErr(true);
            return;
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <div>
                    <h3 className='mb-3'>Ingresa con tu correo electronico</h3>
                    <img
                        src="https://logodownload.org/wp-content/uploads/2018/03/gmail-logo-3-1.png"
                        width={400}
                        alt="gmail"
                        onClick={handleLogin}
                        style={{ cursor: 'pointer' }}
                    />
                    {
                        err && (
                            <div className="alert alert-danger mt-4" role="alert">
                                Ops.. no cuenta con acceso al sistema
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}