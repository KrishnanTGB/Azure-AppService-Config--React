import { useNavigate } from "react-router-dom";
import { appConstants } from "../../../application/configurations/constants";
import { UtilityService } from "../../../infrastructure/utils";
import "./index.scss";

const Home = () => {
  UtilityService.setPageTitle(appConstants.homePageConstants.pageTitle);
  console.log(process.env);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(appConstants.routePaths.about);
  };

  const homePageTitle = process.env.REACT_APP_HOME_PAGE_TITLE
    ? process.env.REACT_APP_HOME_PAGE_TITLE
    : appConstants.homePageConstants.title;
  const homePageDescription = process.env.REACT_APP_HOME_PAGE_DESCRIPTION
    ? process.env.REACT_APP_HOME_PAGE_DESCRIPTION
    : appConstants.homePageConstants.description;
  const aboutButton = process.env.REACT_APP_ABOUTUS_BUTTON
    ? process.env.REACT_APP_ABOUTUS_BUTTON
    : appConstants.buttonNames.aboutus;

  return (
    <div className="home-page">
      <div className="heading">
        <h1>{homePageTitle}</h1>
        <button onClick={handleButtonClick}>{aboutButton}</button>
      </div>
      <p>{homePageDescription}</p>
    </div>
  );
};

export default Home;
