// // import "../style/styleRegister.css";
// // import { useDarkMode } from '../DarkModeProvider/DarkModeContext';
// // import { useNavigate } from "react-router-dom";
// // export default function Register() {
// //     const { darkMode } = useDarkMode();
// //   return (
// //     <div className={`register-container ${darkMode ? 'dark' : ''}`}>
// //       <div className="register-card">
// //         <h1 className="register-title">Register</h1>
        
// //         <form className="register-form">
// //           <div className="form-group">
// //             {/* <label htmlFor="username">Username</label> */}
// //             <input 
// //               type="text" 
// //               id="username" 
// //               placeholder="entrer username" 
// //               className="form-input"
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             {/* <label htmlFor="email">Email</label> */}
// //             <input 
// //               type="email" 
// //               id="email" 
// //               placeholder="entrer email" 
// //               className="form-input"
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             {/* <label htmlFor="password">Password</label> */}
// //             <input 
// //               type="password" 
// //               id="password" 
// //               placeholder="entrer password" 
// //               className="form-input"
// //             />
// //           </div>
          
// //           <button  type="submit" className="register-button">
// //             Register
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// import "../style/styleRegister.css";
// import { useDarkMode } from '../DarkModeProvider/DarkModeContext';
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axiosClient from "../Axios/axios";
// import { Loader2 as Loader } from "lucide-react";
// import { useState } from "react";

// // Validation schema
// const registerSchema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters")
// });

// export default function Register() {
//   const { darkMode } = useDarkMode();
//   const navigate = useNavigate();
//   const [serverError, setServerError] = useState(null);
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting }
//   } = useForm({
//     resolver: zodResolver(registerSchema)
//   });

//   const onSubmit = async (data) => {
//     setServerError(null);
    
//     try {
//       // Get CSRF cookie first
//       await axiosClient.get("/sanctum/csrf-cookie");
      
//       // Register request
//       const response = await axiosClient.post("/register", data);
      
//       if (response.status === 201 || response.status === 200) {
//         console.log("data",data)
//         navigate("/login"); // Redirect to login after successful registration
//       }
//     } catch (error) {
//       if (error.response?.status === 422) {
//         // Laravel validation errors
//         setServerError(
//           error.response.data.message || 
//           "Validation failed. Please check your inputs."
//         );
//       } else {
//         setServerError(
//           error.response?.data?.message || 
//           "Registration failed. Please try again later."
//         );
//       }
//     }
//   };

//   return (
//     <div className={`register-container ${darkMode ? 'dark' : ''}`}>
//       <div className="register-card">
//         <h1 className="register-title">Register</h1>
        
//         {serverError && (
//           <div className="error-message">{serverError}</div>
//         )}
        
//         <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
//           <div className="form-group">
//             <input
//               type="text"
//               id="username"
//               placeholder="Enter username"
//               className={`form-input ${errors.username ? "error" : ""}`}
//               {...register("username")}
//             />
//             {errors.username && (
//               <span className="text-danger">{errors.username.message}</span>
//             )}
//           </div>
          
//           <div className="form-group">
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter email"
//               className={`form-input ${errors.email ? "error" : ""}`}
//               {...register("email")}
//             />
//             {errors.email && (
//               <span className="text-danger">{errors.email.message}</span>
//             )}
//           </div>
          
//           <div className="form-group">
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter password"
//               className={`form-input ${errors.password ? "error" : ""}`}
//               {...register("password")}
//             />
//             {errors.password && (
//               <span className="text-danger">{errors.password.message}</span>
//             )}
//           </div>
          
//           <button 
//             type="submit" 
//             className="register-button"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader className="animate-spin inline mr-2" size={18} />
//                 Registering...
//               </>
//             ) : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import "../style/styleRegister.css";
import { useDarkMode } from '../DarkModeProvider/DarkModeContext';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../Axios/axios";
import { Loader2 as Loader } from "lucide-react";
import { useState } from "react";

// Enhanced validation schema with password confirmation
const registerSchema = z.object({
  name: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters"),
    // .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    // .regex(/[0-9]/, "Must contain at least one number"),
  password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"]
});

export default function Register() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const submitForm = async (data) => {
    setServerError(null);
    console.log(data)
    try {
      console.log(data)
      // Get CSRF cookie first
      await axiosClient.get("/sanctum/csrf-cookie");
      
      // Register request with password confirmation
      const response = await axiosClient.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation
      });
      if (response.status === 201 || response.status === 200) {
        console.log(response.status)
        navigate("/login");
      }
    } catch (error) {
       
      if (error.response?.status === 422) {
        console.log('Full validation errors:', error.response.data.errors);
        // Handle Laravel validation errors
        const errors = error.response.data.errors;
        Object.keys(errors).forEach(key => {
          setError(key, {
            type: 'manual',
            message: errors[key][0]
          });
        });
      } else {
        setServerError(
          error.response?.data?.message || 
          "Registration failed. Please try again later."
        );
      }
    }
  };

  return (
    <div className={`register-container ${darkMode ? 'dark' : ''}`}>
      <div className="register-card">
        <h1 className="register-title">Register</h1>
        
        {serverError && (
          <div className="error-message">{serverError}</div>
        )}
        
        <form className="register-form" onSubmit={handleSubmit(submitForm)}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              className={`form-input ${errors.name ? "error" : ""}`}
              {...register("name")}
            />
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
          </div>
          
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className={`form-input ${errors.email ? "error" : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </div>
          
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Enter password (min 8 chars)"
              className={`form-input ${errors.password ? "error" : ""}`}
              {...register("password")}
            />
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </div>

          {/* Password confirmation field */}
          <div className="form-group">
            <input
              type="password"
              id="password_confirmation"
              placeholder="Confirm password"
              className={`form-input ${errors.password_confirmation ? "error" : ""}`}
              {...register("password_confirmation")}
            />
            {errors.password_confirmation && (
              <span className="text-danger">{errors.password_confirmation.message}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin inline mr-2" size={18} />
                Registering...
              </>
            ) : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}