import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#6A38C2] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Brand */}
        <h2 className="text-xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h2>

        <p className="mt-2 text-sm text-purple-100">
          Connecting talent with top companies.
        </p>

        {/* Copyright */}
        <div className="mt-4 text-xs text-purple-200">
          © {new Date().getFullYear()} JobPortal. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
