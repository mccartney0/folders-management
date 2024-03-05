import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store';
import { setActive } from '../store/context-menu';

interface ContextMenuProps {
  x: number;
  y: number;
  onRename: () => void;
  onDelete: () => void;
}

const ContextMenu = ({ x, y, onRename, onDelete }: ContextMenuProps) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state: RootState) => state.contextMenu.isActive);

  const handleClose = () => {
    dispatch(setActive(false));
  };

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(setActive(true));
  };

  const handleClick = (action: 'rename' | 'delete'): void => {
    dispatch(setActive(false));
    if (action === 'rename') {
      onRename();
    } else if (action === 'delete') {
      onDelete();
    }
  };

  if (!isActive) return null;

  return (
    <div style={{ left: x, top: y }} onContextMenu={handleRightClick} className='absolute bg-white p-2 rounded shadow-lg shadow-indigo-500/40'>
      <div className="close-btn d-flex justify-content-end">
        <button onClick={handleClose} className='btn btn-close'></button>
      </div>

      <div className='d-flex flex-column gap-3 btn-group-vertical'>
        <button
          onClick={() => handleClick('rename')}
          className='btn hover:bg-slate-100'
        >
          Rename
        </button>

        <button
          onClick={() => handleClick('delete')}
          className='btn hover:bg-slate-100'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContextMenu;
