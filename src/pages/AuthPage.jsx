import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

const AuthPage = ({ setIsAuth }) => {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        //? uygulamada oturumun açık olduğunu yönetmek için
        localStorage.setItem("token", res.user.refreshToken);
        setIsAuth(true);    
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Odası</h1>
        <p>Devam etmek için giriş yapınız</p>
        <button onClick={handleLogin}>
          <img src="/g-logo.svg" alt="google-logo" />
          <span>Google ile gir</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
