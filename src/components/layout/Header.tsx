import React, { useState } from 'react';
import { Menu, Bell, Search, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import clsx from 'clsx';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Search */}
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search orders, customers, products..."
            type="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">3</span>
            </span>
          </button>

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          />

          {/* Profile dropdown */}
          <HeadlessMenu as="div" className="relative">
            <HeadlessMenu.Button className="-m-1.5 flex items-center p-1.5 hover:bg-gray-50 rounded-md">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
                alt={`${user?.firstName} ${user?.lastName}`}
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {user?.firstName} {user?.lastName}
                </span>
              </span>
            </HeadlessMenu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <HeadlessMenu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={clsx(
                        active ? 'bg-gray-50' : '',
                        'flex px-3 py-1 text-sm leading-6 text-gray-900 items-center'
                      )}
                    >
                      <User className="mr-3 h-4 w-4 text-gray-400" />
                      Your profile
                    </a>
                  )}
                </HeadlessMenu.Item>
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={clsx(
                        active ? 'bg-gray-50' : '',
                        'flex px-3 py-1 text-sm leading-6 text-gray-900 items-center'
                      )}
                    >
                      <Settings className="mr-3 h-4 w-4 text-gray-400" />
                      Settings
                    </a>
                  )}
                </HeadlessMenu.Item>
                <hr className="my-1" />
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={clsx(
                        active ? 'bg-gray-50' : '',
                        'flex w-full px-3 py-1 text-sm leading-6 text-gray-900 items-center text-left'
                      )}
                    >
                      <LogOut className="mr-3 h-4 w-4 text-gray-400" />
                      Sign out
                    </button>
                  )}
                </HeadlessMenu.Item>
              </HeadlessMenu.Items>
            </Transition>
          </HeadlessMenu>
        </div>
      </div>
    </div>
  );
}