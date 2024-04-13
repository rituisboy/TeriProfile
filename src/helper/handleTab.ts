interface handleTabProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  cmd: string[];
}

const handleTab = ({ input, setInput, cmd }: handleTabProps) => {
  for (let index = 0; index < cmd.length; index++) {
    const sliced = cmd[index].slice(0, input.length);

    if (sliced == input) {
      setInput(cmd[index]);
    }
  }
};

export default handleTab;
