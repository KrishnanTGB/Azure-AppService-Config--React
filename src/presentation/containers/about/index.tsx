import { useNavigate } from "react-router-dom";
import { appConstants } from "../../../application/configurations/constants";
import { UtilityService } from "../../../infrastructure/utils";
import "./index.scss";

const About = () => {
  UtilityService.setPageTitle(appConstants.aboutPageConstants.pageTitle);
  
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(appConstants.routePaths.home);
  };

  const aboutPageTitle = process.env.REACT_APP_ABOUT_PAGE_TITLE
    ? process.env.REACT_APP_ABOUT_PAGE_TITLE
    : appConstants.aboutPageConstants.title;
  const aboutPageDescription = process.env.REACT_APP_ABOUT_PAGE_DESCRIPTION
    ? process.env.REACT_APP_ABOUT_PAGE_DESCRIPTION
    : appConstants.aboutPageConstants.description;
  const homeButton = process.env.REACT_APP_HOME_BUTTON
    ? process.env.REACT_APP_HOME_BUTTON
    : appConstants.buttonNames.home;

  return (
    <div className="about-page">
      <div className="heading">
        <button onClick={handleButtonClick}>{homeButton}</button>
        <h1>{aboutPageTitle}</h1>
      </div>
      <p>{aboutPageDescription}</p>
    </div>
  );
};

export default About;
