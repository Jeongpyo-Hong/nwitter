import React, { useState } from "react";
import { db } from "fBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editting, setEdittng] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const nweetTextRef = doc(db, "nweets", `${nweetObj.id}`);

  // -----delete data-----
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await deleteDoc(nweetTextRef);
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
