import axios from "axios";
import React, { useEffect, useState } from "react";
import env from "../Settings";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,Link} from 'react-router-dom';

function Profile() {
  const validate = Yup.object({
    name: Yup.string().nullable(),
    age: Yup.string().nullable(),
    gender: Yup.string().nullable(),
    dob: Yup.string().nullable(),
    mobile: Yup.string().nullable(),
  });

  const [currentUser, setCurrentUser] = useState(
    window.localStorage.getItem("user")
  );
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [mobile, setMobile] = useState(null);
  const navigate = useNavigate();
 


  const getUserDetails = async () => {
    try {
      const res = await axios.get(`${env.api}/${currentUser}`);
      setName(res.data.name);
      setAge(res.data.age);
      setGender(res.data.gender);
      setDob(res.data.dob);
      setMobile(res.data.mobile);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    
    try {
      await axios.put(`${env.api}/update/${currentUser}`, {
        name,
        age,
        gender,
        dob,
        mobile,
      });
      setLoading(false);
      getUserDetails();
      toast.success("Profile Details Updated!",{
        toastId: "success"
    });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!",{
        toastId: "error"
    });
    }
  };

  useEffect(() => {
    getUserDetails();
    toast.success("Successful Sign-in!",{
        toastId: "login"
    });
  }, []);

  const handleGender = (e) => {
    setGender(e.target.value);
    console.log(e.target.value)
  };

  const handleLogout = async (e) =>{
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("app_token");
    setCurrentUser();
    navigate('/')
  }
  return (
    <>
      {loading ? (
        <h2>Loading....</h2>
      ) : currentUser ? (<>
        <div className="signup__page">
          <div className="container-fluid signup__container">
            <form onSubmit={handleUpdate}>
              
                <div class="form-row">
                  <div class="form-group col-md-6">
                      <span>Name</span>
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your Name"
                      value={name}
                    />
                  </div>
                  <div class="form-group col-md-6">
                  <span>Age</span>
                    <input
                      type="text"
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your Age"
                      value={age}
                    />
                  </div>
                  </div>
                  <div class="form-row">
                  <div className="form-group col-md-6">
                      <p>Your Gender is : {gender}</p> 
                    <input
                      type="radio"
                      value="Male"
                      id="male"
                      onChange={handleGender}
                      name="gender"
                    />
                    <label for="male">Male</label>

                    <input
                      type="radio"
                      value="Female"
                      id="female"
                      onChange={handleGender}
                      name="gender"
                    />
                    <label for="female">Female</label>
                  </div>
              <div class="form-group col-md-6">
              <span>Date of birth</span>
                    <input
                      type="text"
                      onChange={(e) => setDob(e.target.value)}
                      placeholder="Enter your Date of Birth"
                      value={dob}
                    />
                  </div>
                  </div>
              <div class="col">
              <span>Contact Number</span>
                    <input
                      type="text"
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter your Mobile Number"
                      value={mobile}
                    />
                  </div>
              
              
              <button className="submit-btn test__Button mt-3" type="submit">Update Details</button>
              <button className="test__Button mt-3" onClick={handleLogout}>Log out</button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </>) : (
      <h2>Sorry! Page Not Found or try Logging in Again.</h2>
      )}
    </>
  );
}

export default Profile;
