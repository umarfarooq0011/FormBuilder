import { useState } from "react";
import { Textarea } from "../Formbuilder_Ui/Textarea";


export const OptionsEditor = ({ options, onChange }) => {
  const [text, setText] = useState((options || []).join("\n"));
  return (
    <Textarea
      rows={5}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={() =>
        onChange(
          text
            .split(/\n+/)
            .map((s) => s.trim())
            .filter(Boolean)
        )
      }
      placeholder={"Option 1\nOption 2\nOption 3"}
    />
  );
};