function TypingBox({ input, onChange, disabled }) {
  return (
    <input
      className="typing-input"
      value={input}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start typing..."
      disabled = {disabled}
      autoFocus
    />
  );
}

export default TypingBox;