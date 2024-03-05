import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import FolderPlusIcon from './icons/folder-plus.svg';

interface Directory {
  id: number;
  user: string;
  name: string;
  parent: number | null;
}

const DirectoryComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [directories, setDirectories] = useState<Directory[]>([]);
  const { token } = useSelector(useAuth);
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let filteredDirectories = directories;

  const fetchDirectories = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get("/directories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDirectories(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [setLoading, setDirectories, token]);

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

      await axios.post<Directory>("/directories", directoryData, {
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
      await axios.put<Directory>(
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
      await axios.delete(`/directory/${id}`, {
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
    <div>
      <h2>Directories:</h2>

    <div className="new">
      <button
        className="btn btn-success d-flex align-items-center gap-2"
        onClick={handleCreateDirectory}
        disabled={loading}
      >
        <img
          src={FolderPlusIcon}
          alt="New folder icon"
        />

        <span>New Directory</span>
      </button>
    </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="wrapper-folders-container">
          {filteredDirectories.map((directory) => (
            <div key={directory.id}>
              <span
                onClick={() => handleOpenDirectory(directory.id)}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {directory.name}
              </span>
              <button onClick={() => handleDeleteDirectory(directory.id)}>
                Delete
              </button>
              <button onClick={() => handleUpdateDirectory(directory.id)}>
                Update
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectoryComponent;
