"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Bar, Line, Radar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Laptop, Users, TrendingUp, BookOpen, Home, BarChart2, UserCheck, Settings, Bell, Search, ChevronDown, LogOut, User } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, ArcElement, Title, Tooltip, Legend, Filler);

// Enhanced sample data
const progressData = [
  { week: 'Week 1', average: 20, topPerformer: 35 },
  { week: 'Week 2', average: 35, topPerformer: 50 },
  { week: 'Week 3', average: 45, topPerformer: 65 },
  { week: 'Week 4', average: 60, topPerformer: 80 },
  { week: 'Week 5', average: 75, topPerformer: 90 },
  { week: 'Week 6', average: 85, topPerformer: 95 },
];

const subjectData = {
  labels: ['Gujarati', 'Mathematics', 'Science', 'Social Studies', 'English'],
  datasets: [
    {
      label: 'Average Score',
      data: [80, 70, 90, 65, 75],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Top Score',
      data: [95, 88, 98, 82, 90],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};

const studentData = [
  { id: 1, name: 'Aarav Patel', overallScore: 78, improvement: 5, signLanguage: 85, braille: 70, lastActive: '2 hours ago', completedModules: 15 },
  { id: 2, name: 'Diya Shah', overallScore: 82, improvement: 3, signLanguage: 90, braille: 75, lastActive: '1 day ago', completedModules: 18 },
  { id: 3, name: 'Veer Mehta', overallScore: 75, improvement: 7, signLanguage: 80, braille: 85, lastActive: '3 hours ago', completedModules: 14 },
  { id: 4, name: 'Anaya Desai', overallScore: 88, improvement: 2, signLanguage: 95, braille: 80, lastActive: '30 minutes ago', completedModules: 20 },
  { id: 5, name: 'Reyansh Kumar', overallScore: 71, improvement: 8, signLanguage: 75, braille: 90, lastActive: '5 hours ago', completedModules: 13 },
];

const accessibilityData = {
  labels: ['Sign Language Users', 'Braille Users', 'Visual Aids Users', 'Hearing Aids Users', 'Cognitive Aids Users'],
  datasets: [{
    data: [30, 25, 20, 15, 10],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
  }]
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('home');

  const NavItem = ({ icon: Icon, label, section }) => (
    <li 
      className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${activeSection === section ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
      onClick={() => setActiveSection(section)}
    >
      <Icon size={20} />
      <span>{label}</span>
    </li>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'home':
        return <HomeSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'students':
        return <StudentsSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">EduAdapt</h1>
          <p className="text-sm text-gray-500">Inclusive Learning Platform</p>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            <NavItem icon={Home} label="Dashboard" section="home" />
            <NavItem icon={BarChart2} label="Analytics" section="analytics" />
            <NavItem icon={UserCheck} label="Students" section="students" />
            <NavItem icon={BookOpen} label="Courses" section="courses" />
            <NavItem icon={Settings} label="Settings" section="settings" />
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input type="text" placeholder="Search..." className="bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
              </div>
              <Bell className="text-gray-400 cursor-pointer" />
              <div className="flex items-center space-x-2 cursor-pointer">
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <span className="text-sm font-medium text-gray-700">John Doe</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const HomeSection = () => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard icon={Users} label="Total Students" value="1,234" change="+5.2%" />
      <StatCard icon={Laptop} label="Active Courses" value="28" change="+3" />
      <StatCard icon={TrendingUp} label="Avg. Improvement" value="12.7%" change="+2.3%" />
      <StatCard icon={BookOpen} label="Learning Modules" value="156" change="+5" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Learning Path Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Line
              data={{
                labels: progressData.map(d => d.week),
                datasets: [
                  {
                    label: 'Average Progress',
                    data: progressData.map(d => d.average),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    fill: true,
                  },
                  {
                    label: 'Top Performer',
                    data: progressData.map(d => d.topPerformer),
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.5)',
                    fill: true,
                  }
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Student Learning Path Progression' },
                },
                scales: {
                  y: { beginAtZero: true, max: 100, title: { display: true, text: 'Completion %' } },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar
            data={subjectData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Average Scores by Subject' },
              },
              scales: {
                y: { beginAtZero: true, max: 100, title: { display: true, text: 'Score' } },
              },
            }}
          />
        </CardContent>
      </Card>
      <AccessibilityDistribution />
    </div>
    <RecentActivityFeed />
  </div>
);

const AnalyticsSection = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">Detailed Analytics</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar
            data={subjectData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Average vs Top Scores by Subject' },
              },
              scales: {
                y: { beginAtZero: true, max: 100, title: { display: true, text: 'Score' } },
              },
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Skill Assessment Radar</CardTitle>
        </CardHeader>
        <CardContent>
          <Radar
            data={{
              labels: ['Reading', 'Writing', 'Listening', 'Speaking', 'Problem Solving', 'Critical Thinking'],
              datasets: [{
                label: 'Average Skill Level',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Student Skill Assessment' },
              },
              scales: {
                r: { beginAtZero: true, max: 100 },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Detailed Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>This Month</TableHead>
              <TableHead>Last Month</TableHead>
              <TableHead>Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Average Completion Rate</TableCell>
              <TableCell>78%</TableCell>
              <TableCell>72%</TableCell>
              <TableCell className="text-green-600">+6%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average Time per Module</TableCell>
              <TableCell>45 minutes</TableCell>
              <TableCell>52 minutes</TableCell>
              <TableCell className="text-green-600">-7 minutes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Student Engagement Score</TableCell>
              <TableCell>8.5/10</TableCell>
              <TableCell>7.8/10</TableCell>
              <TableCell className="text-green-600">+0.7</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Accessibility Feature Usage</TableCell>
              <TableCell>92%</TableCell>
              <TableCell>85%</TableCell>
              <TableCell className="text-green-600">+7%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

const StudentsSection = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">Student Profiles</h2>
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Overall Progress</TableHead>
              <TableHead>Improvement</TableHead>
              <TableHead>Sign Language</TableHead>
              <TableHead>Braille</TableHead>
              <TableHead>Completed Modules</TableHead>
              <TableHead>Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentData.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Progress value={student.overallScore} className="w-full mr-2" />
                    <span>{student.overallScore}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-green-600">+{student.improvement}%</TableCell>
                <TableCell>{student.signLanguage}%</TableCell>
                <TableCell>{student.braille}%</TableCell>
                <TableCell>{student.completedModules}</TableCell>
                <TableCell>{student.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {studentData.sort((a, b) => b.overallScore - a.overallScore).slice(0, 3).map((student, index) => (
              <li key={student.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-500">Overall Score: {student.overallScore}%</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Most Improved</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {studentData.sort((a, b) => b.improvement - a.improvement).slice(0, 3).map((student, index) => (
              <li key={student.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-500">Improvement: +{student.improvement}%</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
);

const StatCard = ({ icon: Icon, label, value, change }) => (
  <Card>
    <CardContent className="flex items-center p-6">
      <Icon size={24} className="text-blue-500 mr-4" />
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </p>
      </div>
    </CardContent>
  </Card>
);

const AccessibilityDistribution = () => (
  <Card>
    <CardHeader>
      <CardTitle>Accessibility Needs Distribution</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64">
        <Doughnut
          data={accessibilityData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'right' },
              title: { display: true, text: 'Distribution of Accessibility Needs' },
            },
          }}
        />
      </div>
    </CardContent>
  </Card>
);

const RecentActivityFeed = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <UserCheck size={20} className="text-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Aarav Patel completed "Advanced Sign Language Communication" module
            </p>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
        </li>
        <li className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <TrendingUp size={20} className="text-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Overall student performance increased by 3.2% this week
            </p>
            <p className="text-sm text-gray-500">1 day ago</p>
          </div>
        </li>
        <li className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <BookOpen size={20} className="text-purple-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              New course "Inclusive STEM Education" added to the curriculum
            </p>
            <p className="text-sm text-gray-500">3 days ago</p>
          </div>
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default Dashboard;