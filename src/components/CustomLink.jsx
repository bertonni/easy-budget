import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function CustomLink({ children, to, ...props }) {
  const { user } = useAuth();
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  const active = match ? "text-amber-500 pointer-events-none" : "";
  const disabled = !user && match === null ? "pointer-events-none text-gray-400" : "";
  const classes = `w-full h-full flex flex-col items-center gap-1 justify-center ${active} ${disabled}`; 

  return (
    <div>
      <Link
        className={classes}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}
