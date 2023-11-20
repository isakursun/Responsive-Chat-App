import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  where
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const Chat = ({ room, setRoom }) => {
  const [messages, setMessages] = useState(null);

  //? kolaeksiyonun referansını alıyoruz
  const messagesRef = collection(db, "messages");

  //? mesaj gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    await addDoc(messagesRef, {
      text,
      room,
      author: {
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(), //? veritabanının bulunduğu sunucunun zamanını alır, firebase sağlar bunu
    });

    //? mesajdan sonra inputu temizleme
    e.target[0].value = "";
  };

  //? koleksiyondaki değişimi izleme
  useEffect(() => {
    //? filtreleme ayarları
    const options = query(messagesRef,where('room','==',room),orderBy('createdAt','asc'))
    //? Koleksiyon her değiştiğinde "onSnapshot" bir fonksiyon çalıştırıp
    //? fonk. na güncel dökümanları parametre olarak gönderir.
    const unsubscribe = onSnapshot(options, (snapshot) => {
      //? mesajları geçici olarak bir dizide tutuyoruz.
      const tempData = [];
      //? doc'ların verilerine erişip diziye gönderiyoruz.
      snapshot.docs.forEach((doc) => tempData.push(doc.data()));

      //? state i güncelle
      setMessages(tempData);
    });
    console.log(messages);
    //? bileşenden ayrılırsak izleyici iptal edilir
    return () => unsubscribe();
  }, []);

  return (
    <div className="chat">
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>
        {messages?.map((data,i) => (
          <Message key={i} data={data}/>
        ))}
      </main>
      <form onSubmit={handleSubmit}>
        <input type="text" required placeholder="Mesajınızı yazınız.." />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default Chat;
