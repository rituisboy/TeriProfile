import { GITHUB, HELP, START } from "./data";

interface handleCmdProps {
  input: string;
  output: string;
  bgImage: string;
  setBgImage: React.Dispatch<React.SetStateAction<string>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setShowGithub: React.Dispatch<React.SetStateAction<boolean>>;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
}

export const handleCmd = ({
  input,
  output,
  bgImage,
  setBgImage,
  setInput,
  setShowGithub,
  setOutput,
}: handleCmdProps) => {
  let newOutput = "";

  output ? (newOutput += output + "\n") : null;
  newOutput += START;
  newOutput += input;
  if (input == "changebg") {
    bgImage == "" ? setBgImage("url('/wallpaper.svg')") : setBgImage("");
    setInput("");
    return;
  } else if (input === "help") {
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
  setOutput(newOutput);
  setInput("");
};
