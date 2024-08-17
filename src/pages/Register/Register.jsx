

import { useContext, useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../AuthProvider/AuthProvider";


const Register = () => {

  const {createUser, updateUserProfile, setUser } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // navigation
  const location = useLocation();
     const navigate = useNavigate();


  const onSubmit = data => {
    const {email, password, name, photo} = data

    setRegisterError('')
    setSuccess('')

    if(password.length < 6){
      setRegisterError('password should have at least 6 characters');
      return;
    }
    else if(!/[A-Z]/.test(password)){
      setRegisterError('password must have at least one uppercase letter');
      return;
    }
    else if(!/[a-z]/.test(password)){
      setRegisterError('password must have at least one lowercase letter');
      return;
    }
    
    createUser(email, password)
    .then((result) => {
      toast.success('successfully register')
      console.log(result)
      if(result.user){
         
      updateUserProfile(name, photo)
      .then(()=> {

        setUser((user)=>({
          
          ...user, displayName:name, photoURL: photo 
         }))
        
        navigate(location?.state || '/')
      })
        // navigate(location?.state || '/')
       
       }
      })
   .catch((error) =>{
   setRegisterError(error.message);
   })
  
  };
 
    

    return (
      <div>
          <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center  lg:text-left">
            <h1 className="text-4xl font-bold">Register now!</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body w-[400px]">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Name" className="input input-bordered" 
                {...register("name", { required: true })}
                />
                {errors.name && <span className="text-red-500">This field is required</span>}
              </div>
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
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text" placeholder="Photo URL" className="input input-bordered"
                {...register("photo", { required: true })}
                />
                 {errors.photo && <span className="text-red-500">This field is required</span>}
              </div>
              <div className=" relative" >
                <div className="form-control">
                <label  className="label">
                  <span className="label-text">Password</span>
                </label>
                
                <input
                type= "password"
                placeholder="password" 
                className="input input-bordered relative" 
                {...register("password", { required: true })}
               />
               {errors.password && <span className="text-red-500">This field is required</span>}
               
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                
              </div>
              </div>
              {
                registerError && <p className="text-red-500">{registerError}</p>
              }
              <div className="form-control mt-2">
                <button className="btn bg-orange-400 text-white">Register</button>
              </div>
            </div>
            <p className="text-center mb-4">Already have an account? <Link to='/login' className="text-orange-500 font-bold ">Login</Link> </p>
          </form>
        </div>
      </div>
      </div>
    );
};

export default Register;