import React from 'react';
import { useAuth } from '@/layouts/Root';
import { useSelector } from 'react-redux';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const LogoutButton = ({ className = "" }) => {
  const { logout } = useAuth();
  const { user } = useSelector(state => state.user);

  if (!user) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={logout}
      className={`flex items-center ${className}`}
    >
      <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
};

export default LogoutButton;