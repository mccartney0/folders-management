import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Directory } from "../types/types";
import FolderPlusIcon from "./icons/folder-plus.svg";
import LoadIcon from "./icons/load.svg";
import { setDirectories } from "../store/directories";
import { RootState } from "../store";
import useRefreshToken from "../hooks/useRefreshToken";

const DirectoryComponent = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [failedRequest, setFailedRequest] = useState<boolean>(false);
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
    } catch (error) {
      setFailedRequest(true);
      console.error(error);
    }
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
      <div className="new-folder-and-refresh-token d-flex justify-content-between">
        <button
          className="btn btn-success d-flex align-items-center gap-2"
          onClick={handleCreateDirectory}
        >
          <img src={FolderPlusIcon} alt="New folder icon" />

          <span>New Directory</span>
        </button>

        <button
          onClick={refresh}
          className={`btn ${!loading ? 'btn-light' : 'btn-warning'}`}
          disabled={!loading}
        >
          <img src={LoadIcon} alt="Refresh button" />
        </button>
      </div>

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
          <div className="wrapper-folders-container my-16">
            <h2 className="fs-5">Directories:</h2>

            {filteredDirectories.map((directory) => (
              <div key={directory.id} className="d-flex justify-content-between">
                <span
                  onClick={() => handleOpenDirectory(directory.id)}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {directory.name}
                </span>

                <div className="actions btn-group">
                  <button
                    onClick={() => handleUpdateDirectory(directory.id)}
                    className="btn btn-primary icon"
                  >
                    Rename
                  </button>

                  <button
                    onClick={() => handleDeleteDirectory(directory.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default DirectoryComponent;
