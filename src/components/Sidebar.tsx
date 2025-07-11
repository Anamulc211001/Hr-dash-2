import React, { useState, useEffect } from 'react';
import { semanticColors } from '../styles/colors';
import { 
  Home, 
  Users, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  UserPlus, 
  BookOpen, 
  Bell,
  Menu,
  X,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Settings,
  UserCheck,
  UserX,
  Award,
  BarChart3,
  Clock,
  CreditCard,
  FileText,
  Calculator,
  Briefcase,
  Search,
  GraduationCap,
  Target,
  AlertCircle,
  Mail,
  User,
  Shield,
  Palette,
  Globe,
  Database
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  children?: MenuItem[];
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const [openParent, setOpenParent] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'Overview', icon: Home },
    { 
      id: 'employees', 
      label: 'Employees', 
      icon: Users,
      children: [
        { id: 'employee-list', label: 'Employee List', icon: Users },
        { id: 'employee-add', label: 'Add Employee', icon: UserPlus },
        { id: 'employee-reports', label: 'Employee Reports', icon: FileText }
      ]
    },
    { 
      id: 'performance', 
      label: 'Performance', 
      icon: TrendingUp,
      children: [
        { id: 'performance-overview', label: 'Overview', icon: BarChart3 },
        { id: 'performance-reviews', label: 'Reviews', icon: Award },
        { id: 'performance-goals', label: 'Goals & Targets', icon: Target }
      ]
    },
    { 
      id: 'attendance', 
      label: 'Attendance', 
      icon: Calendar,
      children: [
        { id: 'attendance-overview', label: 'Overview', icon: Calendar },
        { id: 'attendance-tracking', label: 'Time Tracking', icon: Clock },
        { id: 'attendance-reports', label: 'Reports', icon: FileText }
      ]
    },
    { 
      id: 'payroll', 
      label: 'Payroll', 
      icon: DollarSign,
      children: [
        { id: 'payroll-overview', label: 'Overview', icon: DollarSign },
        { id: 'payroll-processing', label: 'Process Payroll', icon: Calculator },
        { id: 'payroll-reports', label: 'Payroll Reports', icon: FileText },
        { id: 'payroll-benefits', label: 'Benefits', icon: CreditCard }
      ]
    },
    { 
      id: 'recruitment', 
      label: 'Recruitment', 
      icon: UserPlus,
      children: [
        { id: 'recruitment-jobs', label: 'Job Postings', icon: Briefcase },
        { id: 'recruitment-candidates', label: 'Candidates', icon: Search },
        { id: 'recruitment-interviews', label: 'Interviews', icon: Users }
      ]
    },
    { 
      id: 'training', 
      label: 'Training', 
      icon: BookOpen,
      children: [
        { id: 'training-courses', label: 'Courses', icon: GraduationCap },
        { id: 'training-progress', label: 'Progress', icon: BarChart3 },
        { id: 'training-certificates', label: 'Certificates', icon: Award }
      ]
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Bell,
      children: [
        { id: 'notifications-inbox', label: 'Inbox', icon: Mail },
        { id: 'notifications-alerts', label: 'Alerts', icon: AlertCircle },
        { id: 'notifications-settings', label: 'Settings', icon: Settings }
      ]
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      children: [
        { id: 'settings-profile', label: 'Profile', icon: User },
        { id: 'settings-security', label: 'Security', icon: Shield },
        { id: 'settings-appearance', label: 'Appearance', icon: Palette },
        { id: 'settings-system', label: 'System', icon: Globe },
        { id: 'settings-data', label: 'Data & Export', icon: Database }
      ]
    }
  ];

  // Auto-expand parent if activeSection is a child
  useEffect(() => {
    for (const item of menuItems) {
      if (item.children) {
        const hasActiveChild = item.children.some(child => child.id === activeSection);
        if (hasActiveChild) {
          setOpenParent(item.id);
          break;
        }
      }
    }
  }, [activeSection]);

  const handleParentClick = (parentId: string) => {
    if (openParent === parentId) {
      setOpenParent(null); // Close if already open
    } else {
      setOpenParent(parentId); // Open this parent
    }
  };

  const handleChildClick = (childId: string) => {
    setActiveSection(childId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const handleDirectClick = (itemId: string) => {
    setActiveSection(itemId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const isChildActive = (children: MenuItem[]) => {
    return children.some(child => child.id === activeSection);
  };

  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isParentOpen = openParent === item.id;
    const isActive = activeSection === item.id || (hasChildren && isChildActive(item.children!));

    if (hasChildren) {
      return (
        <div key={item.id}>
          {/* Parent Button */}
          <button
            onClick={() => handleParentClick(item.id)}
            className={`w-full flex items-center rounded-lg transition-all duration-200 ${
              isOpen ? 'space-x-3 px-4 py-3' : 'justify-center px-2 py-3'
            } ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:transform hover:scale-102'
            }`}
            title={!isOpen ? item.label : undefined}
          >
            <Icon size={18} className="flex-shrink-0" />
            {isOpen && (
              <>
                <span className={`font-medium text-sm lg:text-base flex-1 text-left ${
                  isActive ? 'text-white font-semibold' : ''
                }`}>
                  {item.label}
                </span>
                {isParentOpen ? (
                  <ChevronUp size={16} className="flex-shrink-0" />
                ) : (
                  <ChevronDown size={16} className="flex-shrink-0" />
                )}
              </>
            )}
          </button>

          {/* Children (Sub-menu) */}
          {isOpen && isParentOpen && item.children && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-4">
              {item.children.map((child) => {
                const ChildIcon = child.icon;
                const isChildActiveState = activeSection === child.id;
                
                return (
                  <button
                    key={child.id}
                    onClick={() => handleChildClick(child.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isChildActiveState
                        ? 'bg-blue-600 text-white shadow-md transform scale-105'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <ChildIcon size={16} className="flex-shrink-0" />
                    <span className={`font-medium ${
                      isChildActiveState ? 'text-white font-semibold' : ''
                    }`}>
                      {child.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    } else {
      // Regular menu item without children
      return (
        <button
          key={item.id}
          onClick={() => handleDirectClick(item.id)}
          className={`w-full flex items-center rounded-lg transition-all duration-200 ${
            isOpen ? 'space-x-3 px-4 py-3' : 'justify-center px-2 py-3'
          } ${
            activeSection === item.id
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
              : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:transform hover:scale-102'
          }`}
          title={!isOpen ? item.label : undefined}
        >
          <Icon size={18} className="flex-shrink-0" />
          {isOpen && (
            <span className={`font-medium text-sm lg:text-base ${
              activeSection === item.id ? 'text-white font-semibold' : ''
            }`}>
              {item.label}
            </span>
          )}
        </button>
      );
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-white text-gray-900 transform transition-all duration-300 ease-in-out shadow-xl border-r border-gray-200
        ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between w-full">
              {isOpen ? (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-lg p-2 flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="Company Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent leading-tight">
                      HR Dashboard
                    </h1>
                    <p className="text-gray-500 text-xs font-medium mt-0.5 leading-tight">Management System</p>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center py-1">
                  <div className="w-10 h-10 bg-white rounded-lg shadow-md p-1.5 flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="Company Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
              
              {/* Desktop minimize button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="hidden lg:block text-gray-500 hover:text-gray-700 hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-all shadow-sm"
              >
                {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
              
              {/* Mobile close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700 hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-all"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map(renderMenuItem)}
          </nav>
          
          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2 bg-gray-50">
            {/* Helpline Button */}
            <button
              onClick={() => {
                alert('Helpline: Call +1-800-HR-HELP or email support@company.com');
              }}
              className={`w-full flex items-center rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all duration-200 hover:transform hover:scale-102 ${
                isOpen ? 'space-x-3 px-4 py-3' : 'justify-center px-2 py-3'
              }`}
              title={!isOpen ? 'Help & Support' : undefined}
            >
              <HelpCircle size={18} className="flex-shrink-0" />
              {isOpen && <span className="font-medium text-sm lg:text-base">Help & Support</span>}
            </button>
            
            {/* Logout Button */}
            <button
              onClick={() => {
                if (confirm('Are you sure you want to logout?')) {
                  alert('Logging out...');
                }
              }}
              className={`w-full flex items-center rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 hover:transform hover:scale-102 ${
                isOpen ? 'space-x-3 px-4 py-3' : 'justify-center px-2 py-3'
              }`}
              title={!isOpen ? 'Logout' : undefined}
            >
              <LogOut size={18} className="flex-shrink-0" />
              {isOpen && <span className="font-medium text-sm lg:text-base font-poppins">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;