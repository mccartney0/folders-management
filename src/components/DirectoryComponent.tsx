import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Directory } from "../types/types";
import { setDirectories } from "../store/directories";
import { setActive } from "../store/context-menu";
import { RootState } from "../store";
import useRefreshToken from "../hooks/useRefreshToken";
import directoryPlusIcon from "./icons/directory-plus.svg";
import LoadIcon from "./icons/load.svg";
import DirectoryIcon from "./icons/directory.svg";
import EmptyDirectory from "../assets/empty-directory.jpg";
import ContextMenu from "./ContextMenu";

const DirectoryComponent = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [failedRequest, setFailedRequest] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [clickedItemId, setClickedItemId] = useState<number | null>(null);

  const { token } = useSelector(useAuth);
  const { id } = useParams();
  const { pathname } = useLocation();
  const directories = useSelector(
    (state: RootState) => state.directories.directories
  );

  const dispatch = useDispatch();
  const refresh = useRefreshToken();
  const navigate = useNavigate();

  let filteredDirectories = directories;

  const fetchDirectories = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await axiosPrivate.get("/directories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setDirectories(response.data));
      setLoading(false);
      setFailedRequest(false);
    } catch (error: any) {
      if (error.response.status === 401) {
        await refresh();
      } else {
        setFailedRequest(true);
      }
    }
    // eslint-disable-next-line
  }, [axiosPrivate, setLoading, dispatch, token]);

  useEffect(() => {
    fetchDirectories();
  }, [fetchDirectories, id]);

  const createDirectory = async (name: string) => {
    try {
      setLoading(true);

      const directoryData: { user: number; name: string; parent?: number } = {
        user: 0,
        name,
      };

      if (id) {
        directoryData.parent = parseInt(id);
      }

      await axiosPrivate.post<Directory>("/directories", directoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchDirectories();
    } catch (error) {
      console.error(error);
    }
  };

  const updateDirectory = async (id: number, newName: string) => {
    try {
      setLoading(true);
      await axiosPrivate.put<Directory>(
        `/directory/${id}`,
        { name: newName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchDirectories();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDirectory = async (id: number) => {
    try {
      setLoading(true);
      await axiosPrivate.delete(`/directory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchDirectories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDirectory = (id: number) => {
    if (window.confirm("Are you sure you want to delete this directory?")) {
      deleteDirectory(id);
    }
  };

  const handleUpdateDirectory = (id: number) => {
    const newName = prompt("Enter new directory name:");
    if (newName) {
      updateDirectory(id, newName);
    }
  };

  const handleCreateDirectory = () => {
    const directoryName = prompt("Enter directory name:");
    if (directoryName) {
      createDirectory(directoryName);
    }
  };

  const handleOpenDirectory = async (id: number) => {
    try {
      navigate(`/home/directory/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, id: number): void => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    dispatch(setActive(true));
    setClickedItemId(id);
  };

  if (pathname === "/home" || pathname === "/home/") {
    filteredDirectories = directories.filter(
      (directory) => directory.parent === null
    );
  } else if (pathname.startsWith("/home/directory/") && id) {
    const parentId = parseInt(id);
    filteredDirectories = directories.filter(
      (directory) => directory.parent === parentId
    );
  }

  return (
    <div className="wrapper-directory-component">
      <div className="new-directory-and-refresh-token d-flex justify-content-between">
        <button
          className="btn btn-success d-flex align-items-center gap-2"
          onClick={handleCreateDirectory}
        >
          <img src={directoryPlusIcon} alt="New directory icon" />
          <span>New Directory</span>
        </button>

        <button
          onClick={refresh}
          className={`btn ${!loading ? 'd-none btn-light' : 'd-inline btn-warning'}`}
          disabled={!loading}
        >
          <img src={LoadIcon} alt="Refresh button" />
        </button>
      </div>

      <h2 className="fs-5 mt-10">Directories:</h2>

      {failedRequest ? (
        <div className="d-flex justify-content-center align-items-center mt-16">
          <span className="bg-warning p-2 rounded-md">
            Please check your internet connection and try again. If the problem persists, contact the support team for further assistance.
          </span>
        </div>
      ) : (
        loading ? (
          <div className="d-flex justify-content-center align-items-center mt-16">
            <div>Loading...</div>
          </div>
        ) : (
          <div className="wrapper-directory-container">
            {filteredDirectories.length > 0 ? (
              filteredDirectories.map((directory) => (
                <div
                  key={directory.id}
                  className="d-flex justify-content-between align-items-center my-3 p-2 rounded hover:bg-slate-100"
                  onContextMenu={(e) => handleContextMenu(e, directory.id)}
                >
                  <span
                    onClick={() => handleOpenDirectory(directory.id)}
                    className="cursor-pointer hover:underline flex items-center justify-center gap-2"
                  >
                    <img src={DirectoryIcon} alt="Directory icon" className="w-10 h-10" />
                    <span className="text-center directory-name overflow-hidden text-ellipsis">{directory.name}</span>
                  </span>

                  <div className="actions btn-group">
                    <button
                      onClick={() => handleUpdateDirectory(directory.id)}
                      className="btn bg-blue-500 text-white hover:bg-blue-700"
                    >
                      Rename
                    </button>

                    <button
                      onClick={() => handleDeleteDirectory(directory.id)}
                      className="btn bg-red-500 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex justify-content-center align-items-center flex-column mt-4">
                <img src={EmptyDirectory} alt="Empty directory" className="w-4/12	grayscale" />

                <span className="mb-6">Empty directory</span>

                <button
                  onClick={handleCreateDirectory}
                  className="btn bg-blue-500 text-white hover:bg-blue-700"
                >
                  Add directory
                </button>
              </div>
            )}
          </div>
        )
      )}

      <ContextMenu
        x={contextMenuPosition.x}
        y={contextMenuPosition.y}
        onRename={() => clickedItemId !== null && handleUpdateDirectory(clickedItemId)}
        onDelete={() => clickedItemId !== null && handleDeleteDirectory(clickedItemId)}
      />
    </div>
  );
};

export default DirectoryComponent;
