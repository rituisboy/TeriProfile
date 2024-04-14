import { GITHUB, HELP } from "./data";

export const handleEnter = ({
  input,
  newOutput,
  setShowGithub,
  setOutput,
  setInput,
}) => {
  if (input === "help") {
    newOutput += HELP;
  } else if (input === "clear") {
    newOutput = "";
  } else if (input === "github") {
    setShowGithub(true);
    newOutput += GITHUB;
    setOutput(newOutput);
    setInput("");

    return;
  } else {
    newOutput +=
      "\n  Unknown Command \n Enter help to get list of available command";
    setOutput(newOutput);
    setInput("");
  }
};
