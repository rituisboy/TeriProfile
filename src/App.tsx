import { useEffect, useRef, useState } from "react";
import "./index.css";
import { GITHUB, HELP, START, WELCOME } from "./data/data";
import { Github } from "./components/Github";
import { BottomCard } from "./components/BottomCard";

function App() {
  const COLOR = "#000814";
  const BORDER_COLOR = "#e7c6ff";
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([""]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [showGithub, setShowGithub] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = () => {
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  const focusOnScroll = () => {
    inputRef.current?.focus();
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key == "ArrowUp") {
      if (historyIndex < cmdHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setInput(cmdHistory[newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === "Enter") {
      focusOnScroll();

      setHistoryIndex(-1);
      setShowGithub(false);
      inputRef.current?.focus();
      let newOutput = "";

      output ? (newOutput += output + " \n ") : null;
      newOutput += START;
      newOutput += input;
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
      setCmdHistory((prevHistory) => [input, ...prevHistory]);
      setOutput(newOutput);
      setInput("");
      // inputRef.current?.scrollIntoView();
      // inputRef.current?.focus();
    }
  };

  const scrollToBottom = () => {
    const container = document.querySelector(".overflow-auto");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  // Use useEffect to scroll to bottom when output changes
  useEffect(() => {
    scrollToBottom();
  }, [output]); // Depend on output state

  return (
    <>
      <div
        className="overflow-auto h-[calc(100dvh)] p-5 border-4 text-white text-lg whitespace-pre-line"
        style={{
          backgroundColor: COLOR,
          fontFamily: "pixelFont",
          borderColor: BORDER_COLOR,
          overflowY: "auto",
        }}
      >
        <p ref={outputRef} dangerouslySetInnerHTML={{ __html: output }}></p>
        {showGithub && <Github />}{" "}
        {!output && (
          <p>
            <pre>
              <code>{WELCOME}</code>
            </pre>
            Enter <span className="text-green-500">help</span> to get list of
            available commands
          </p>
        )}
        <span className="text-green-300">rituraj</span>
        <span className="text-yellow-100">@</span>
        <span className="text-blue-300">portfolio</span>{" "}
        <span className="text-red-600">$</span>{" "}
        <input
          className="outline-none "
          style={{ backgroundColor: COLOR }}
          type="text"
          value={input}
          ref={inputRef}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={handleEnter}
          placeholder="help"
        />
        <BottomCard/>
      </div>
    </>
  );
}

export default App;
