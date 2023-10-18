'use client'
import React from 'react'
import { SignInButton, useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

type Props = {}

const Habits = (props: Props) => {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const { user } = useUser();
    return (
        <div className="App">
            <SignInButton mode="modal" />
            {isAuthenticated ? "Logged in" : "Logged out or still loading"}
            <p>{user.fullName}</p>
            <p>{user.id}</p>
        </div>
    )
}

export default Habits