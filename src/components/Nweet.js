import React, { useState } from "react";
import { db, storage } from "fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const Nweet = ({ nweetObj, isOwner }) => {
  console.log("nweetObj", nweetObj);
  const [editting, setEdittng] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const nweetTextRef = doc(db, "nweets", `${nweetObj.id}`);

  // -----delete data-----
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    const attachmentUrl = nweetObj.attachmentUrl;
    if (ok) {
      await deleteDoc(nweetTextRef);
      // 업로드한 사진이 있는 경우에만 사진을 지우기
      if (attachmentUrl !== "") await deleteObject(ref(storage, attachmentUrl));
    }
  };

  // -----update data-----
  const toggleEditting = () => {
    setEdittng((prev) => !prev);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(nweetTextRef, { text: newNweet });
    setEdittng((prev) => !prev);
  };

  return (
    <div>
      {editting ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              placeholder="Update your nweet"
              value={newNweet}
              required
            />
            <input type="submit" value="Update nweet!" />
          </form>
          <button onClick={toggleEditting}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              alt="attachmentImg"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditting}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
