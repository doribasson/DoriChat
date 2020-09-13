import React, { useState } from "react";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import "./MyEmoji.css";

const MyEmoji = ({ input, setInput, setEmojiFlag }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);

    setInput(input + emojiObject.emoji);
    setEmojiFlag(false);
  };

  return (
    <div className="container__emoji">
      <Picker
        onEmojiClick={onEmojiClick}
        disableAutoFocus={true}
        skinTone={SKIN_TONE_MEDIUM_DARK}
        groupNames={{ smileys_people: "PEOPLE" }}
      />
    </div>
  );
};

export default MyEmoji;
