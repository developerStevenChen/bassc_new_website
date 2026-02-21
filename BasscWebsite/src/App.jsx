import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsDetail from './pages/NewsDetail';
import PlaceholderPage from './pages/PlaceholderPage';
import Login from './pages/Login';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import HomePagePicManage from './pages/dashboard/HomePagePicManage';
import BoardManage from './pages/dashboard/BoardManage';
import CourseManage from './pages/dashboard/CourseManage';
import IntroductionManage from './pages/dashboard/IntroductionManage';
import NewsManage from './pages/dashboard/NewsManage';
import NavItemManage from './pages/dashboard/NavItemManage';
import './App.css';

const placeholderTitles = {
  class: 'Courses',
  event: 'Events',
  athlete: 'Athletes',
  coach: 'Coach',
  award: 'Awards',
  news: 'News',
  micro: 'Micro Class',
  peripheral: 'Merchandise',
  contact: 'Contact',
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/news" element={<PlaceholderPage title={placeholderTitles.news} />} />
        <Route path="/class" element={<CourseList />} />
        <Route path="/class/:slug" element={<CourseDetail />} />
        <Route path="/event" element={<PlaceholderPage title={placeholderTitles.event} />} />
        <Route path="/athlete" element={<PlaceholderPage title={placeholderTitles.athlete} />} />
        <Route path="/coach" element={<PlaceholderPage title={placeholderTitles.coach} />} />
        <Route path="/award" element={<PlaceholderPage title={placeholderTitles.award} />} />
        <Route path="/micro" element={<PlaceholderPage title={placeholderTitles.micro} />} />
        <Route path="/peripheral" element={<PlaceholderPage title={placeholderTitles.peripheral} />} />
        <Route path="/contact" element={<PlaceholderPage title={placeholderTitles.contact} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="homepagepic" element={<HomePagePicManage />} />
          <Route path="boards" element={<BoardManage />} />
          <Route path="introductions" element={<IntroductionManage />} />
          <Route path="news" element={<NewsManage />} />
          <Route path="navitems" element={<NavItemManage />} />
          <Route path="courses" element={<CourseManage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
