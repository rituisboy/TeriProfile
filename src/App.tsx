import { useEffect, useRef, useState } from "react";
import "./index.css";
import { GITHUB, HELP, START, WELCOME } from "./helper/data";
import { Github } from "./components/Github";
import { BottomCard } from "./components/BottomCard";
import handleTab from "./helper/handleTab";
import { handleCmd } from "./helper/handleCmd";

function App() {
  const COMMANDS = [
    "github",
    "help",
    "clear",
    "projects",
    "whoami",
    "changebg",
  ];
  const COLOR = "#000814";
  const BORDER_COLOR = "#e7c6ff";

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLInputElement>(null);

  const [bgImage, setBgImage] = useState("");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState("");
  const [totalCmd, setTotalCmd] = useState<number>(0);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [showGithub, setShowGithub] = useState<boolean>(false);

  // const handleCmd = () => {
  //   let newOutput = "";

  //   output ? (newOutput += output + "\n") : null;
  //   newOutput += START;
  //   newOutput += input;
  //   if (input == "changebg") {
  //     bgImage == "" ? setBgImage("url('/wallpaper.svg')") : setBgImage('');
  //     setInput('')
  //     return
  //   } else if (input === "help") {
  //     newOutput += HELP;
  //   } else if (input === "clear") {
  //     newOutput = "";
  //   } else if (input === "github") {
  //     setShowGithub(true);
  //     newOutput += GITHUB;
  //     setOutput(newOutput);
  //     setInput("");

  //     return;
  //   } else {
  //     newOutput +=
  //       "\n  Unknown Command \n Enter help to get list of available command";
  //     setOutput(newOutput);
  //     setInput("");
  //   }
  //   setOutput(newOutput);
  //   setInput("");
  // };

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

  const updateTotalAndHistory = () => {
    // if (input) {
    //   if (cmdHistory[0] == "") {
    //     setCmdHistory(() => [input]);
    //     console.log(cmdHistory);
    //   } else {
    //     setCmdHistory((prev) => [...prev, input]);
    //   }
    //   setTotalCmd(cmdHistory.length);
    // }
    /*
    in the abouve code the lenght of cmdHistory is update after exiting if tag 
    but setTotal is inside if so it updates old*/

    if (input) {
      setCmdHistory((prev) => {
        let updatedHistory = [];
        if (prev[0] == "") {
          updatedHistory = [input];
        } else {
          updatedHistory = [...prev, input];
        }
        // Directly use the updated history to set totalCmd
        setTotalCmd(updatedHistory.length);
        return updatedHistory;
      });
    }
  };

  const handleUpArrow = () => {
    if (totalCmd > 0) {
      setInput(cmdHistory[totalCmd - 1]);
      setTotalCmd((pre) => pre - 1);
    }
  };
  const handleDownArrow = () => {
    if (totalCmd < cmdHistory.length) {
      setInput(cmdHistory[totalCmd + 1] || "");
      setTotalCmd((pre) => pre + 1);
    } // else {
    //   setInput('')
    // }
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key == "ArrowUp") {
      handleUpArrow();
    }
    if (e.key == "ArrowDown") {
      handleDownArrow();
    }

    if (e.key == "Tab") {
      e.preventDefault();
      handleTab({ input, setInput, cmd: COMMANDS });
    } else if (e.key === "Enter") {
      updateTotalAndHistory();

      focusOnScroll();

      setShowGithub(false);
      inputRef.current?.focus();

      handleCmd({
        input,
        output,
        bgImage,
        setBgImage,
        setInput,
        setShowGithub,
        setOutput,
      });

      // output ? (newOutput += output + "\n") : null;
      // newOutput += START;
      // newOutput += input;
      // if (input === "help") {
      //   newOutput += HELP;
      // } else if (input === "clear") {
      //   newOutput = "";
      // } else if (input === "github") {
      //   setShowGithub(true);
      //   newOutput += GITHUB;
      //   setOutput(newOutput);
      //   setInput("");

      //   return;
      // } else {
      //   newOutput +=
      //     "\n  Unknown Command \n Enter help to get list of available command";
      //   setOutput(newOutput);
      //   setInput("");
      // }
      // setOutput(newOutput);
      // setInput("");
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
        className="overflow-auto h-[calc(100dvh)] p-5 border-4 text-white 
        
        text-lg whitespace-pre-line"
        style={{
          backgroundImage: bgImage,
          backgroundColor: COLOR,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          fontFamily: "pixelFont",
          borderColor: BORDER_COLOR,
          overflowY: "auto",
        }}
      >
        <div ref={outputRef} dangerouslySetInnerHTML={{ __html: output }}></div>
        {showGithub && <Github />}{" "}
        {!output && (
          <div className="text-gray-500">
            <pre className="text-green-300">
              <code className="w-[100px]">{WELCOME}</code>
            </pre>
            <p>
              Enter <span className="text-green-500">help</span> to get list of
              available commands
            </p>
            <p className="">
              Press <span className="text-red-700">tab ⇆</span> to autocomplete
            </p>
          </div>
        )}
        <div className="flex">
          <span className="text-green-300">rituraj</span>
          <span className="text-yellow-100">@</span>
          <span className="text-blue-300">portfolio</span>{" "}
          <span className="text-red-600 px-2">$</span>{" "}
          <input
            className="outline-none fixed opacity-0"
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
          <div className="flex">
            {input}{" "}
            <p className="h-[20px] translate-y-1 animate-pulse-fast w-2 bg-white"></p>
          </div>
        </div>
        <BottomCard />
      </div>
    </>
  );
}

export default App;
