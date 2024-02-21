'use client'
import withAuth from '@/hoc/hocauth';


import './Home.css';
import StudentsTable from '../../components/studentsTable/StudentsTable';

const Home = () => {
  return (
    <div className="body">
      <StudentsTable />
    </div>
  );
};

export default withAuth(Home);
