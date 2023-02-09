import Nweet from "components/Nweet";
import { db } from "fBase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  // -----add data-----
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (error) {
      console.error(error);
    }
    setNweet("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  // -----get Data(real time)-----
  useEffect(() => {
    const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      {nweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};

export default Home;
