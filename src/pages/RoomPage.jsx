import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const RoomPage = ({ setIsAuth, setRoom }) => {
  //? kullanıcının oturumunu sonlandırma
  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("token");
      setIsAuth(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //? oda ismini küçük harflere çevirip state i güncelledik
    const roomName = e.target[0].value.toLowerCase();
    setRoom(roomName);
  };

  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi odaya girmek istiyorsunuz</p>

      <input type="text" placeholder="örn:haftasonu" />
      <button type="submit">Odaya Gir</button>
      <button type="button" onClick={handleLogout}>
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;
