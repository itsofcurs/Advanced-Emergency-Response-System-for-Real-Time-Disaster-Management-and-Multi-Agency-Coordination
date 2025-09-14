import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const [notificationCount] = useState(3);

  const handleEmergencyAlert = () => {
    // Emergency alert functionality
    console.log('Emergency alert triggered');
  };

  const handleNotifications = () => {
    // Notifications functionality
    console.log('Notifications opened');
  };

  const handleUserProfile = () => {
    // User profile functionality
    console.log('User profile opened');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-header bg-card border-b border-border z-sidebar">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Menu Toggle & Logo */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Shield" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-emergency-lg font-semibold text-foreground">
                Emergency Response
              </h1>
              <p className="text-emergency-xs text-muted-foreground">
                Command Center
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center space-x-3">
          {/* Emergency Alert Button */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEmergencyAlert}
            iconName="AlertTriangle"
            iconPosition="left"
            className="hidden md:flex animate-emergency-pulse"
          >
            Emergency Alert
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotifications}
              aria-label="View notifications"
            >
              <Icon name="Bell" size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-border">
            <div className="hidden md:block text-right">
              <p className="text-emergency-sm font-medium text-foreground">
                Sarah Johnson
              </p>
              <p className="text-emergency-xs text-muted-foreground">
                Emergency Dispatcher
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUserProfile}
              className="rounded-full"
              aria-label="User profile"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;