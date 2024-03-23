"use client"
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from "@/app/lib/userAuth";
import styles from "@/app/ui/dashboard/changepassword/changepassword.module.css";
import UserServices from '@/services/user_service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ChangePasswordForm = () => {
  const { handleLogin } = useContext(AuthContext);
  const router = useRouter();
  const userClients = UserServices;
  const [forgotpassword, setforgotpassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const handleChange = (e) => {
    setforgotpassword({
      ...forgotpassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(forgotpassword.newPassword==forgotpassword.confirmPassword){
      const{confirmPassword,...dataToSend}=forgotpassword
      await userClients.changePassword(dataToSend);
  toast.success('Password changed successfully', { position: 'top-right' });
  setTimeout(() => {
    router.push("/login");
  }, 1000);

    }
    else{
      toast.error('Confirm password not match new password', { position: 'top-right' });
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ToastContainer/>
      <input type="password" placeholder="Current Password" name="currentPassword" required onChange={handleChange} />
      <input type="password" placeholder="NewPassword" name="newPassword" required onChange={handleChange} />
      <input type="password" placeholder="Confirm Password" name="confirmPassword" required onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ChangePasswordForm;
