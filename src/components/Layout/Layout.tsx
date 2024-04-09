import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css'
import TaskList from '../../containers/TaskList/taskList';

const Layout = () => {
  return (
    <div className="layout">
      <div className="sider">
        <NavLink className="menu-item menu-btn" to="/build">
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
          <p className="menu-item" >
            Тэги
          </p>
        </div>
      </div>
      <div className="content">
        <div className="main-content">
          <Outlet />
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Layout;
