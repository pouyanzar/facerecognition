import "./Logo.css";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";

const Logo = () => {
  return (
    <Tilt className="tilt br2 shadow-2 ma4 mt0">
      <div className="tilt__img">
        <img style={{ paddingTop: "10px" }} src={brain} alt="logo" />
      </div>
    </Tilt>
  );
};

export default Logo;
