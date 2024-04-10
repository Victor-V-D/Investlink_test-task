import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import NewTaskModal from '../UI/NewTaskModal/NewTaskModal';
import TaskList from '../../containers/TaskList/TaskList';
import { directoryTags } from '../../features/taskSlice';
import './Layout.css'

const Layout = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleOpenModal = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="layout">
      <div className="sider">
        <NavLink className="menu-item menu-btn" to="#" onClick={handleOpenModal}>
          Новая задача
        </NavLink>
        <div className="menu">
          <NavLink className="menu-item menu-link" to="/my-task">
            <img src="../../../public/my.png" alt="My Task" />
            Мои задачи
          </NavLink>
          <NavLink className="menu-item menu-link" to="/important-task">
            <img src="../../../public/important.png" alt="Important Task" />
            Важные
          </NavLink>
          <NavLink className="menu-item menu-link" to="/done-task">
            <img src="../../../public/done.png" alt="Done Task" />
            Выполненные
          </NavLink>
          <NavLink className="menu-item menu-link" to="/delete-task">
            <img src="../../../public/delete.png" alt="Delete Task" />
            Удалённые
          </NavLink>
          <div className='menu-tags'>
            <p className="menu-item" > Тэги </p>
            {directoryTags.map((tag) => (
              <div key={tag}>
                <label htmlFor={tag}>{tag}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="main-content">
          <Outlet />
          <TaskList />
        </div>
      </div>
      {showAddModal && <NewTaskModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Layout;
