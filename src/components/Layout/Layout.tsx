import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { directoryCategory } from '../../features/taskSlice';
import { directoryTags } from '../../features/taskSlice';
import NewTaskModal from '../UI/NewTaskModal/NewTaskModal';
import TaskList from '../../containers/TaskList/TaskList';
import './Layout.css'

const Layout = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilterCategory, setFilterCategory] = useState('Мои задачи');
  const [selectedFilterTags, setFilterTags] = useState<string[]>([]);

  const handleOpenModal = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleFilterCategory = (filter: string) => {
    setFilterCategory(filter);
  };

  const handleFilterTag = (tag: string) => {
    if (selectedFilterTags.includes(tag)) {
      setFilterTags(selectedFilterTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setFilterTags([...selectedFilterTags, tag]);
    }
  };

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case 'Мои задачи':
        return <img src='../../../public/my.png' />;
      case 'Важные':
        return <img src='../../../public/important.png' />;
      case 'Выполненные':
        return <img src='../../../public/done.png' />;
      case 'Удалённые':
        return <img src='../../../public/delete.png' />;
      default:
        return null;
    }
  };

  return (
    <div className="layout">
      <div className="sider">
        <NavLink className="menu-item menu-btn" to="#" onClick={handleOpenModal}>
          Новая задача
        </NavLink>
        <div className="menu">

          <div className='menu-categories'>
            {directoryCategory.map((category) => (
              <div key={category} className={`menu-item 
              ${selectedFilterCategory === category ? 'selectedCategory' : ''}`}>
                <label htmlFor={category} onClick={() =>
                  handleFilterCategory(category)}>
                  {renderCategoryIcon(category)}
                  {category}
                </label>
              </div>
            ))}
          </div>

          <div className='menu-tags'>
            <p className="menu-item menu-item-tag"> Тэги </p>
            {directoryTags.map((tag) => (
              <div key={tag} className="menu-item">
                <label className={`${selectedFilterTags.includes(tag) ? 'selectedTag' : ''}`}
                  htmlFor={tag} onClick={() =>
                    handleFilterTag(tag)}>{tag}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="main-content">
          <Outlet />
          <TaskList selectedFilterCategory={selectedFilterCategory} selectedFilterTags={selectedFilterTags} />
        </div>
      </div>
      {showAddModal && <NewTaskModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Layout;
