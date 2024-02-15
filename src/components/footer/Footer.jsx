import { FaLinkedinIn, FaGithubSquare } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import "./footerStyle.css";
export default function Footer() {
  return (
    <div className="footer">
      <a
        href="https://www.linkedin.com/in/abdullah-mahmoud-f196/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedinIn />
      </a>
      <a
        href="https://github.com/AbdullahM196"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithubSquare />
      </a>
      <a href="mailto:abdullah.mahmoud.f196@gmail.com">
        <MdOutlineEmail />
      </a>
    </div>
  );
}
