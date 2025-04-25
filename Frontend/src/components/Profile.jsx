import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LogOut, Settings, UserCircle, FileText, HelpCircle, Star } from "lucide-react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export default function Profile() {
  const user = {
    name: "Vignesh Reddy",
    email: "vigneshreddy625@gmail.com",
    avatarUrl: "https://github.com/shadcn.png",
    role: "Premium",
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-blue-100 text-blue-600">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-64 mx-16 p-3 shadow-lg rounded-lg">
        <div className="grid gap-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-blue-500">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm">{user.name}</h4>
                <Badge variant="outline" className="text-xs border-none bg-blue-50 text-blue-700">
                    {user.role}
                </Badge>
              </div>
              <p className="pt-0.5 text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <Separator className="my-1" />

          <div className="grid gap-1">
            <Button
              variant="ghost"
              className="justify-start px-2 h-8 hover:text-blue-600 hover:bg-gray-100 cursor-pointer"
            >
              <UserCircle className="mr-2 h-4 w-4" />
              <span className="text-sm">Account</span>
            </Button>
            <Button
              variant="ghost"
              className="justify-start px-2 h-8  hover:text-blue-600 hover:bg-gray-100 cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span className="text-sm">Settings</span>
            </Button>
            <Button
              variant="ghost"
              className="justify-start px-2 h-8 hover:text-blue-600 hover:bg-gray-100 cursor-pointer"
            >
              <FileText className="mr-2 h-4 w-4" />
              <span className="text-sm">Documents</span>
            </Button>
            <Button
              variant="ghost"
              className="justify-start px-2 h-8 hover:text-blue-600 hover:bg-gray-100 cursor-pointer"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              <span className="text-sm">Help</span>
            </Button>
          </div>

          <Separator className="my-1" />

          <Button
            variant="destructive"
            className="w-full h-8 font-medium bg-red-500 hover:bg-red-600 text-white text-sm cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}