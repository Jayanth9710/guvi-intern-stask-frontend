import React,{ useState} from 'react';
import * as Yup from 'yup';
import {Formik,Form} from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import env from '../Settings';
import Textfield from './Textfield';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Register() {

    const validate  = Yup.object({
        name : Yup.string()
        .max(15,"Must be within 15 characters")
        .required("Required"),
        email : Yup.string().email("Email is invalid").required("Email is required"),
        password : Yup.string()
        .min(6,"Password must be atleast 6 characters")
        .required("Password is required!"),
        confirmPassword : Yup.string()
        .oneOf([Yup.ref("password"),null],"Password must watch")
        .required("Confirm Password is a required field."),
    });

    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false)
const [failure,setFailure] = useState(false)

    const postData = async (data) => {
        setLoading(true)
        try {
            let Data = await axios.post(`${env.api}/signup`,data);
            toast.success("User registered successfully!");
            // window.alert("User registered successfully");
            setLoading(false);
            setFailure(false)
            setSuccess(true)
            navigate('/signin')
        } catch (error) {
            setLoading(false)
            setFailure(true);
            if(error.message === "Request failed with status code 400") {
                toast.warn("E-mail is already registered.Please use different e-mail ID.");
                // window.alert("E-mail is already registered.Please use different e-mail ID.");
                // console.log(error)
            } else{
                toast.error("Check your connection!");
                // window.alert("Check your connection");
                console.log(error);
            }
        }
    }
    return (
        <>
        {loading ? <h2>Loading....</h2> : 
        <div className='signup__page'>
            <div className='signup__container'>
            <Formik initialValues={{
                name:"",
                email:"",
                password:"",
                confirmPassword:"",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
                let data = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                };
                postData(data);
                setLoading(true);
            }}>
                { (formik) => (
                    < div className='signup__title'>
                        <div className='signup__inner'>
                        <Form>
                            <Textfield  
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter your Name"
                            />
                            <Textfield 
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your e-mail ID"/>
                            <Textfield 
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"/>
                            <Textfield 
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"/>

                            <button className='signup__buttons' type='submit'>SIGNUP</button>
                            <p>Already Have an Account? Go back to login</p>
                            <Link to="/signin" className="test__Button justify-content-center">
                    Login
            </Link>
                        </Form>
                        <ToastContainer />
                        {success &&(
                    <span className="success">Successful.You can log in now!</span>
                )}
                {/* {failure && (
                <span className="failure">Something went wrong!</span>
                )} */}
                        </div>
                    </div>
                )}

            </Formik>
            </div>
            </div>
        }
        </>
        
    )
}

export default Register