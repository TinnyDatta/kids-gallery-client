

import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {

  const {signInUser,updateUserProfile,setUser} = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const [success, setSuccess] = useState('');

  // navigation
  const location = useLocation();
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

// handle register
  const onSubmit = data => {
    const {email, password,name,photo} = data

    setLoginError('')
    setSuccess('')

    signInUser(email, password)
    .then(result => {
      toast.success('Successfully login')
      if(result.user){
        updateUserProfile(name, photo)
      .then(()=> {

        setUser((user)=>({
          
          ...user, displayName:name, photoURL: photo 
         }))
         
        navigate(location?.state || '/')
      })
      //  navigate(location?.state || '/')
      }
   })
   .catch((error) => {
    toast.error('Email & password should match with your register email & password');
    setLoginError(error.message);
   })
  };


    return (
       <div>
         <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold">Login now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body w-[400px]">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" 
                 {...register("email", { required: true })}
                />
                 {errors.email && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" {...register("password", { required: true })} 
                />
                {errors.password && <span className="text-red-500">This field is required</span>}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-2">
                <button className="btn bg-purple-400">Login</button>
              </div>
              <div>
              <p className="text-center">Have an account? <Link to='/register' className="text-purple-500 font-bold ">Register</Link> </p>
              </div>
              
            </form>
            <SocialLogin></SocialLogin>
           
          </div>
        </div>
      </div>
       </div>
    );
};

export default Login;