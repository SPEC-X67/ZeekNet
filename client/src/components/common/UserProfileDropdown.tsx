import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { logoutThunk, logout } from '@/store/slices/auth.slice';
import { UserRole } from '@/constants/enums';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const UserProfileDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, email, role } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {

    dispatch(logout());
    navigate('/');
    
    try {
      await dispatch(logoutThunk()).unwrap();
    } catch {
    }
  };

  const getDashboardPath = () => {
    switch (role) {
      case UserRole.ADMIN:
        return '/admin/dashboard';
      case UserRole.COMPANY:
        return '/company/dashboard';
      case UserRole.SEEKER:
        return '/seeker/dashboard';
      default:
        return '/';
    }
  };

  const getProfilePath = () => {
    switch (role) {
      case UserRole.ADMIN:
        return '/admin/profile';
      case UserRole.COMPANY:
        return '/company/profile';
      case UserRole.SEEKER:
        return '/seeker/profile';
      default:
        return '/profile';
    }
  };

  const getInitials = () => {
    if (name) {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate(getDashboardPath())}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(getProfilePath())}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
