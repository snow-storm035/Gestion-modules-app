import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../Axios/axios";
import { Loader } from "lucide-react";
import "../style/forgotepasswrod.css"; // Reuse your existing styles

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

export function ForgotPassword() {
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      await axiosClient.get("/sanctum/csrf-cookie");
      const response = await axiosClient.post("/forgot-password", data);

      if (response.status === 200) {
        setSuccessMessage("Password reset link sent! Check your email.");
        reset();
        // Auto-close after 3 seconds
        setTimeout(() => setShowModal(false), 3000);
      }
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err.response?.data?.message || "Failed to send reset link"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <a 
        href="#" 
        className="forgot-password-link" 
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        Forgot password?
      </a>

      {showModal && (
        <div className="modal-overlay">
          <div className="forgot-password-modal">
            <button 
              className="close-button" 
              onClick={() => {
                setShowModal(false);
                reset();
              }}
            >
              &times;
            </button>

            <h2 className="modal-title">Reset Password</h2>
            <p className="modal-subtitle">Enter your email to receive a reset link</p>

            <form onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
              <div className="form-group">
                <input
                  type="email"
                  id="forgot-email"
                  placeholder="Your email address"
                  className={`form-input ${errors.email ? "error" : ""}`}
                  {...register("email")}
                />
                {errors.email && (
                  <span className="input-error">{errors.email.message}</span>
                )}
              </div>

              {errors.root && (
                <div className="form-error">{errors.root.message}</div>
              )}

              {successMessage && (
                <div className="form-success">{successMessage}</div>
              )}

              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="spin-animation" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}