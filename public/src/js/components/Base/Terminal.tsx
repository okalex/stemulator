import React, { useEffect, useRef } from "react";

export default function Terminal({ children }) {

  const outputEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [children]);

  return (
    <div className="font-mono whitespace-pre text-xs bg-gray-900 text-gray-300 w-full h-56 overflow-scroll p-2 rounded-md">
      {children}
      <div ref={outputEndRef} />
    </div>
  );
}
