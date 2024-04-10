import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { directoryCategory } from '../../features/taskSlice';
import { directoryTags } from '../../features/taskSlice';
import NewTaskModal from '../UI/NewTaskModal/NewTaskModal';
import TaskList from '../../containers/TaskList/TaskList';
import './Layout.css'

const Layout = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Мои задачи');

  const handleOpenModal = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="layout">
      <div className="sider">
        <NavLink className="menu-item menu-btn" to="#" onClick={handleOpenModal}>
          Новая задача
        </NavLink>
        <div className="menu">

          <div className='menu-categories'>
            <p className="menu-item" > Категории </p>
            {directoryCategory.map((category) => (
              <div key={category}>
                <label htmlFor={category} onClick={() =>
                  handleFilterChange(category)}>
                  {category}
                </label>
              </div>
            ))}
          </div>

          <div className='menu-tags'>
            <p className="menu-item" > Тэги </p>
            {directoryTags.map((tag) => (
              <div key={tag}>
                <label htmlFor={tag} onClick={() =>
                  handleFilterChange(tag)}>{tag}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="main-content">
          <Outlet />
          <TaskList selectedFilter={selectedFilter} />
        </div>
      </div>
      {showAddModal && <NewTaskModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Layout;
