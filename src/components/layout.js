import PropTypes from "prop-types";
import React from "react";

function Layout({ children }) {
  return (
    <div>
      <main>{children}</main>

      <footer className="bg-indigo-600">
        <nav className="flex justify-center max-w-4xl p-4 mx-auto text-sm md:p-8">
          <p className="text-center text-white">
            Created by{` `}
            <a
              className="font-bold no-underline text-center"
              href="https://twitter.com/iliashaddad3"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ilias Haddad
            </a>
          </p>
        </nav>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
