import { useState } from "react";
import { Directory } from "../types/types";

const DirectoryTree = ({ directory, directories }: { directory: Directory;  directories: Directory[] }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div key={directory.id}>
      <span onClick={handleClick} style={{ marginLeft: "6px" }}>
        {expanded ? "📂" : "📁"} {directory.name}
      </span>

      <div
        style={{ marginLeft: "12px" }}
        className={expanded ? "expanded" : "collapsed"}
      >
        {expanded &&
          directories
            .filter((dir) => dir.parent === directory.id)
            .map((childDir) => (
              <DirectoryTree
                key={childDir.id}
                directory={childDir}
                directories={directories}
              />
            ))}
      </div>
    </div>
  );
};

export default DirectoryTree;
