import { useState } from "react";
import { Directory } from "../../types/types";
import { useNavigate } from "react-router-dom";

const SideBarDirectoryTree = ({ directory, directories }: { directory: Directory;  directories: Directory[] }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleClick = async (id: number) => {
    setExpanded(!expanded);

    try {
      navigate(`/home/directory/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div key={directory.id} className="w-full">
      <div
        onClick={() => handleClick(directory.id)}
        className="ml-1.5 d-flex cursor-pointer hover:bg-sky-700"
      >
        <span className="directory-icon">{expanded ? "📂" : "📁"}</span>
        <span
          className="directory-name overflow-hidden	text-ellipsis max-w-sm whitespace-nowrap"
          title={directory.name}
        >
          {directory.name}
          </span>
      </div>

      <div
        className={`ml-3 ${expanded ? "expanded" : "collapsed"}`}
      >
        {expanded &&
          directories
            .filter((dir) => dir.parent === directory.id)
            .map((childDir) => (
              <SideBarDirectoryTree
                key={childDir.id}
                directory={childDir}
                directories={directories}
              />
            ))}

            {expanded && directories.filter((dir) => dir.parent === directory.id).length === 0 && (
              <div className="ml-3 text-xs text-gray-300">Empty directory</div>
            )}
      </div>
    </div>
  );
};

export default SideBarDirectoryTree;
