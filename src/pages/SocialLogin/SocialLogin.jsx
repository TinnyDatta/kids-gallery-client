import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";



const SocialLogin = () => {
 
     const {googleLogin} = useContext(AuthContext);

    //  navigation
     const location = useLocation();
     const navigate = useNavigate();

     const handleSocialLogin = socialProvider => {
      socialProvider()
      .then(result => {
         if(result.user){
        
          navigate(location?.state || '/')
         }
      })
     }

    return (
        <div>
          <div className="divider">more options</div>
            <div className="form-control ml-5 mr-5">
                <button
              onClick={()=>handleSocialLogin(googleLogin)}
             
                className="btn bg-[#FFE4B5]">Google</button>
                
              </div>
        </div>
    );
};

export default SocialLogin;