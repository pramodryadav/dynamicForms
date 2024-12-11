import React, { createContext, useState, useMemo, useEffect } from "react";
import { getSubdirectory } from "../utilities/GetSubdirectory";

const UserProfileContext = createContext({
    profile: null,
    setProfile: () => { }
});

const UserProfileProvider = ({ children }) => {
  const subdirectory = getSubdirectory();
    const [profile, setProfile] = useState(() => {
        // Retrieve profile from localStorage or default to null
        const savedProfile = localStorage.getItem(`${subdirectory}-userProfile`);
        return savedProfile ? JSON.parse(savedProfile) : null;
      });

      useEffect(() => {
        // Save profile to localStorage whenever it changes
        if (profile) {
          localStorage.setItem(`${subdirectory}-userProfile`, JSON.stringify(profile));
        } else {
          localStorage.removeItem(`${subdirectory}-userProfile`);
        }
      }, [profile,subdirectory]);

    const value = useMemo(() => ({ profile, setProfile }), [profile]);

    return (
        <UserProfileContext.Provider value={value}>
            {children}
        </UserProfileContext.Provider>
    );
};

export { UserProfileContext, UserProfileProvider };