function WordDisplay({ words, input }) {
  const allChars = words.join(" ").split("");

  return (
    <div id="word-display">
      {allChars.map((char, index) => {
        let className = "";

        if (input[index] == null) {
          className = "";
        } else if (input[index] === char) {
          className = "correct";
        } else {
          className = "incorrect";
        }

        if (index === input.length) {
          className += " active";
        }

        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
    </div>
  );
}

export default WordDisplay; 