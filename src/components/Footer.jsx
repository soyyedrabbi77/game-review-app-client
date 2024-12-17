import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-800 text-gray-200 py-10">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Brand Info */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-3xl font-bold text-white">🎮 Chill Gamer</h1>
            <p className="text-sm mt-2">
              Your ultimate destination for game reviews and gaming insights. 🌟
            </p>
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            {[
              {
                href: "https://facebook.com",
                icon: "fab fa-facebook-f",
                color: "hover:text-blue-500",
              },
              {
                href: "https://twitter.com",
                icon: "fab fa-twitter",
                color: "hover:text-blue-300",
              },
              {
                href: "https://instagram.com",
                icon: "fab fa-instagram",
                color: "hover:text-pink-500",
              },
              {
                href: "https://discord.com",
                icon: "fab fa-discord",
                color: "hover:text-indigo-500",
              },
              {
                href: "https://reddit.com",
                icon: "fab fa-reddit",
                color: "hover:text-orange-400",
              },
            ].map(({ href, icon, color }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl ${color} transition duration-300`}
              >
                <i className={icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "Explore",
              links: [
                { name: "All Reviews", href: "/reviews" },
                { name: "Add Review", href: "/addReview" },
                { name: "Game Watchlist", href: "/watchlist" },
              ],
            },
            {
              title: "Company",
              links: [
                { name: "About Us", href: "/about-us" },
                { name: "Contact", href: "/contact-us" },
                { name: "Privacy Policy", href: "/privacy" },
              ],
            },
            {
              title: "Community",
              links: [
                { name: "FAQ", href: "/faq" },
                { name: "Forums", href: "/forums" },
                { name: "Support", href: "/support" },
              ],
            },
            {
              title: "Follow Us",
              links: [
                { name: "Facebook", href: "https://facebook.com" },
                { name: "Twitter", href: "https://twitter.com" },
                { name: "YouTube", href: "https://youtube.com" },
              ],
            },
          ].map(({ title, links }, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold mb-3">{title}</h3>
              <ul>
                {links.map(({ name, href }, linkIdx) => (
                  <li key={linkIdx} className="mb-2">
                    <a
                      href={href}
                      className="hover:underline hover:text-white transition duration-300"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center">
          <p className="text-sm">
            &copy; 2024 Chill Gamer. All rights reserved.
          </p>
          <p className="text-sm mt-1">
            Made with <span className="text-red-500">&hearts;</span> by Gamers,
            for Gamers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
