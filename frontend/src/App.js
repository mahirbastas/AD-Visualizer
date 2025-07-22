import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import UserList from './components/UserList.jsx';
import UserDetail from './components/UserDetail.jsx';
import ComputerList from './components/ComputerList.jsx';
import ComputerDetail from './components/ComputerDetail.jsx';
import GroupList from './components/GroupList.jsx';
import GroupDetail from './components/GroupDetail.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:sid" element={<UserDetail />} />
        <Route path="/computers" element={<ComputerList />} />
        <Route path="/computers/:sid" element={<ComputerDetail />} />
        <Route path="/groups" element={<GroupList />} />
        <Route path="/groups/:sid" element={<GroupDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

