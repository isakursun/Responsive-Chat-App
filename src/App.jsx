import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomPage from "./pages/RoomPage";
import Chat from "./pages/Chat";

function App() {
  //? kullanıcının yetkisi olup olmadığının kontolünü tutuyoruz
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  const [room, setRoom] = useState(null);

  //? yetkisi yoksa giriş ekranını basıyoruz
  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  }
  //? yetkisi varsa
  return (
    <div className="container">
      {room ? <Chat room={room} setRoom={setRoom} /> : <RoomPage setIsAuth={setIsAuth} setRoom={setRoom} />}
    </div>
  );
}

export default App;
