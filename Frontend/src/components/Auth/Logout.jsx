import React, {useContext} from 'react';
import { useAuth } from '../../authContext/AuthContext';
import { LogOut } from "lucide-react";
import { Button } from '../ui/button';

const Logout = () => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout(); 
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    return (
        <Button
            variant="destructive"
            className="w-full h-8 font-medium bg-red-500 hover:bg-red-600 text-white text-sm cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </Button>
    );
};

export default Logout;