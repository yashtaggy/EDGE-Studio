"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const POWER_BI_URL =
  "https://app.powerbi.com/groups/me/reports/755a3799-ebea-4862-9c14-6493af1c6404/718f23bb040216b409ea?experience=power-bi";

export default function EdgeDashboardPage() {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // If iframe doesn't load in time, assume access issue
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setIsBlocked(true);
      }
    }, 7000);

    return () => clearTimeout(timeout);
  }, [isLoaded]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black p-6">
      
      {/* ✅ Back navigation */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="text-sm text-gray-300 hover:text-white transition underline"
        >
          ← Back to Portal
        </Link>
      </div>

      {/* ✅ Dashboard Container */}
      <div className="w-full max-w-7xl h-[80vh] rounded-xl overflow-hidden shadow-2xl border border-border relative bg-black">

        {/* ✅ Power BI iframe */}
        {!isBlocked && (
          <iframe
            src={POWER_BI_URL}
            className="w-full h-full"
            onLoad={() => setIsLoaded(true)}
            allowFullScreen
          />
        )}

        {/* ✅ Access Restricted State */}
        {isBlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black">
            <h2 className="text-2xl font-semibold text-white mb-3">
              Access Restricted
            </h2>
            <p className="text-gray-400 max-w-md mb-6">
              You do not currently have access to the EDGE Power BI Dashboard.
              <br />
              Please request access from the dashboard owner or your administrator.
            </p>

            <Link
              href="/"
              className="px-6 py-2 rounded-lg border border-gray-500 text-white hover:bg-gray-800 transition"
            >
              Return to Portal
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}