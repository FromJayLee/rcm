'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Coins, User, Settings, LogOut } from 'lucide-react';

export function TopBar() {
  return (
    <header className="h-16 border-b border-charcoal/20 bg-ivory px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <span className="text-ivory font-bold text-sm">TC</span>
        </div>
        <span className="font-semibold text-lg text-charcoal">Testimonial Creator</span>
      </div>

      {/* Right side - Token balance and user menu */}
      <div className="flex items-center space-x-4">
        {/* Token Balance */}
        <Badge variant="secondary" className="flex items-center space-x-1 bg-charcoal/10 text-charcoal border-charcoal/20">
          <Coins className="w-3 h-3" />
          <span>3 Tokens</span>
        </Badge>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-charcoal/10">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback className="bg-charcoal/10 text-charcoal">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-ivory border-charcoal/20" align="end" forceMount>
            <DropdownMenuLabel className="font-normal text-charcoal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-charcoal/60">
                  john@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-charcoal/20" />
            <DropdownMenuItem className="text-charcoal hover:bg-charcoal/10">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-charcoal/20" />
            <DropdownMenuItem className="text-charcoal hover:bg-charcoal/10">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
