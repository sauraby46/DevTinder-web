# DevTinder – Frontend Application

    DevTinder Frontend is a modern React application that allows developers to:

    Register & Login securely
    Send & Review Connection Requests
    Chat in real-time using WebSockets
    Upgrade to Premium Membership
    View Developer Feed with Pagination
    Manage Profile & Account Settings
    Access protected routes using authentication state

# Built using:

    React
    Redux Toolkit
    Axios
    WebSocket (Socket.IO Client)
    Tailwind CSS
    DaisyUI

# Application Flow

    User Signup / Login → JWT stored in HTTP-only cookie (handled by backend)
    Redux stores authenticated user state
    Protected routes controlled using global auth state
    Axios used for API communication
    WebSocket connection established after login
    Real-time chat enabled between connected users
    Premium status verified using backend API

# Tech Stack Used

    React (SPA Architecture)
    Redux Toolkit (Global State Management)
    Axios (HTTP Client)
    Socket.IO Client (Real-Time Communication)
    Tailwind CSS (Utility-first styling)
    DaisyUI (Prebuilt UI Components)

# State Management(Redux)

    - User authentication state
    - Premium membership state
    - Chat messages state
    - Connection requests state
    - Feed data state

# API Integration (Axios)
    
    - User authentication state
    - Premium membership state
    - Chat messages state
    - Connection requests state
    - Feed data state

# Authentication Handling

    - On login → user data stored in Redux
    - Protected routes check auth state
    - Logout clears Redux state
    - Premium verification on app load
