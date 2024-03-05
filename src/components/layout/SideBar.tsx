import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import DirectoryTree from "../DirectoryTree";

type ILayout = {
  children: ReactNode;
};

const SideBar = ({ children }: ILayout) => {
  const directories = useSelector(
    (state: RootState) => state.directories.directories
  );

  return (
    <div className="wrapper-side-bar">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark vh-100">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
              <span className="fs-5 d-sm-inline mb-3">
                Folders
              </span>

              {directories.map((directory) => {
                if (directory.parent === null) {
                  return <DirectoryTree key={directory.id} directory={directory} directories={directories} />;
                }
                return null;
              })}
            </div>
          </div>

          <div className="col py-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
