import React, { useState, useEffect } from "react";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import "./MyEmoji.css";

const MyEmoji = ({ input, setInput, setEmojiFlag }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);

    // setInput([...emojiObject.emoji, emojiObject.emoji]);
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
      {/* {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />} */}
    </div>
  );
};

// const EmojiData = ({ chosenEmoji, setInput }) => {
//   return (
//     <div>
//       <strong>Unified:</strong> {chosenEmoji.unified}
//       <br />
//       <strong>Names:</strong> {chosenEmoji.names.join(", ")}
//       <br />
//       <strong>Symbol:</strong> {chosenEmoji.emoji}
//       <br />
//       <strong>ActiveSkinTone:</strong> {chosenEmoji.activeSkinTone}
//     </div>
//   );
// };

export default MyEmoji;
