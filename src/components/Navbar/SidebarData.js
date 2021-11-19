import React from 'react'
import { AiFillHome } from 'react-icons/ai';
import { FiUserPlus, FiUsers } from 'react-icons/fi';
import { BiBookmark, BiBookmarks } from 'react-icons/bi';
import { MdOutlineAssignmentReturn, MdOutlineAssignmentReturned } from 'react-icons/md';
import { BsReceiptCutoff } from 'react-icons/bs'

export const SideBarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <AiFillHome />,
        class: 'nav-text'
    },
    {
        title: 'Create User',
        path: '/user',
        icon: <FiUserPlus />,
        class: 'nav-text'
    },
    {
        title: 'User List',
        path: '/users',
        icon: <FiUsers />,
        class: 'nav-text'
    },
    {
        title: 'Create Book',
        path: '/book',
        icon: <BiBookmark />,
        class: 'nav-text'
    },
    {
        title: 'Book List',
        path: '/books',
        icon: <BiBookmarks />,
        class: 'nav-text'
    },
    {
        title: 'Borrow Book',
        path: '/borrow',
        icon: <MdOutlineAssignmentReturn />,
        class: 'nav-text'
    },
    {
        title: 'Return Book',
        path: '/return',
        icon: <MdOutlineAssignmentReturned />,
        class: 'nav-text'
    },
    {
        title: 'Book Records',
        path: '/records',
        icon: <BsReceiptCutoff />,
        class: 'nav-text'
    }

]