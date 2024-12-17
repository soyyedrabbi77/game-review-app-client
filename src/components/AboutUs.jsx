import React from "react";
import "./AboutUs.css"; // Assuming you'll create a separate CSS file

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2 className="about-us-title">About Chill Gamer</h2>
      <p className="about-us-description">
        Welcome to Chill Gamer, your go-to platform for discovering and sharing
        honest game reviews!
      </p>

      <p className="about-us-text">
        Chill Gamer is designed for gamers who want to read insightful reviews
        before making their next gaming purchase. Whether you're into action,
        RPGs, strategy, or indie games, you'll find detailed reviews from fellow
        players who share their experiences.
      </p>

      <h3 className="about-us-subheading">Our Mission</h3>
      <p className="about-us-text">
        Our mission is to create a community-driven platform where gamers can
        connect, share their thoughts, and make informed decisions about the
        games they play. We believe in honest, unbiased reviews that help you
        discover games that match your style and preferences.
      </p>

      <h3 className="about-us-subheading">Meet the Team</h3>
      <p className="about-us-text">
        We are a group of passionate gamers, developers, and enthusiasts who
        wanted to build a space for gamers to express themselves and contribute
        to the gaming community. Our team consists of:
      </p>
      <ul className="team-list">
        <li>
          <strong>John Doe</strong> - Founder & Lead Developer
        </li>
        <li>
          <strong>Jane Smith</strong> - UI/UX Designer
        </li>
        <li>
          <strong>Sam Lee</strong> - Content Manager
        </li>
      </ul>

      <h3 className="about-us-subheading">Contact Us</h3>
      <p className="about-us-text">
        Have questions or suggestions? Feel free to reach out to us at{" "}
        <a href="mailto:support@chillgamer.com" className="about-us-link">
          support@chillgamer.com
        </a>
        .
      </p>

      <h3 className="about-us-subheading">Follow Us</h3>
      <p className="about-us-text">
        Stay up-to-date with the latest reviews and news by following us on
        social media:
      </p>
      <ul className="social-links">
        <li>
          <a
            href="https://twitter.com/chillgamer"
            target="_blank"
            rel="noopener noreferrer"
            className="about-us-link"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://facebook.com/chillgamer"
            target="_blank"
            rel="noopener noreferrer"
            className="about-us-link"
          >
            Facebook
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/chillgamer"
            target="_blank"
            rel="noopener noreferrer"
            className="about-us-link"
          >
            Instagram
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutUs;
