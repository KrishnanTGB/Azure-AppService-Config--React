# Accessing Azure App Service Configuration Inside React App
- Utilizing the Azure App Service Configuration to update the React App without code compilation post deployment completed.

## React App Hosted within Azure App Service
### Create a React App with TypeScript Template
- We have created a sample application based on React with TypeScript template by using the below command.

  `npx create-react-app app-name --template typescript`

- We installed the React redux, routers and sass libraries.

  _azure-app-config\package.json_
  ```
  "react-redux": "^8.0.5",
  "react-router-dom": "^6.11.2",
  "sass": "^1.62.1",
  ```

- We created a standard folder structures as well, below is the screen shot for the POC code base.

  ![image.png](/.attachments/image-28b2ba60-412e-4e16-888a-b88161f92aa8.png)

- We are accessing the values for the page level labels from the constant file for the Local Run.

  _azure-app-config\src\application\configurations\constants.ts_
  ```
  homePageConstants: {
    title: "HOME PAGE LOCAL",
    description: "This text is coming from the Local Configuration file",
    pageTitle: "Home | Azure App Config",
  },
  aboutPageConstants: {
    title: "ABOUT PAGE LOCAL",
    description: "This text is coming from the Local Configuration file",
    pageTitle: "About | Azure App Config",
  },
  buttonNames: {
    home: "Home",
    aboutus: "About Us",
  },
  ```

- We have 2 routes '/home' and '/about' and here's the screen shots for the compiled version of code in Local.

![image](https://github.com/KrishnanTGB/Azure-AppService-Config--React/assets/45973601/94e7261c-b614-4892-972e-a59ad727f9a9)

![image](https://github.com/KrishnanTGB/Azure-AppService-Config--React/assets/45973601/fed952d8-d0b3-492a-aa2e-596c8d05d275)

### Create an Azure App Service
- Once you are signed in to the Azure portal, follow these steps to create an Azure App Service:

1. Click on the "+ Create a resource" button in the Azure portal.
1. In the search bar, type "App Service" and select "App Service" from the search results.
1. Click on the "Create" button to start creating a new App Service.
1. Fill in the required details, such as the app name, subscription, resource group, and operating system.
1. Select the appropriate runtime stack. For a React with TypeScript application, you can choose "Node.js".
1. Set the "Publish" option to "Code".
1. Choose the appropriate region for your App Service.
1. Click the "Next" button to configure additional settings (optional).
1. Review the settings and click the "Review + Create" button.
1. Finally, click the "Create" button to create your App Service

### Deploy Application to Azure App Service
- After creating the Azure App Service, follow these steps to deploy our application:

1. Go to your newly created App Service in the Azure portal.
1. Under the "Deployment" section in the left-hand menu, click on "Deployment Center".
1. Select the "Local Git" option to deploy your application from your local machine.
1. Click the "Start" button to start the deployment process.
1. Follow the instructions provided to set up a local Git repository for your App Service.
1. Once the setup is complete, you'll be provided with the Git endpoint and credentials.
1. Use these credentials to push your local build files to the Git repository.

#### Set up local git repository for your App Service
1. Go back to the "Deployment Center" tab.
1. In the "Local Git Repository" section, click on the "Repository settings" link.
1. In the "Repository settings" page, you'll see instructions on how to configure the local Git repository. Follow these steps:

      -  Open a terminal or command prompt on your local machine.
      - Navigate to your project directory.
      - Run the following command to add the Azure remote Git repository:

        `git remote add azure <git-endpoint>`

      - Replace <git-endpoint> with the Git endpoint URL you copied earlier.
      - Run the following command to push your code to the Azure remote Git repository:

        `git push azure master`
      - When prompted, enter the deployment credentials you set earlier.

1. Wait for the Git push to complete. The Azure App Service build service will automatically build and deploy your application.

## Access App Service Configuration inside React App
### Create Application Setting
1. Navigate to your deployed Azure App Service.
1. In the left-hand menu, under the "Settings" section, click on "Configuration".
1. In the "Configuration" page, you will see a list of application settings.
1. Locate the constant that you want to change (e.g., the label name) or add a new application setting by clicking on the "+ New application setting" button.
1. In the "Name" field, enter a name for the application setting (e.g., REACT_APP_LABEL_NAME).

   **Note :** Make sure that the variable names in the application setting of your Azure App Service start with **'REACT_APP_'** prefix. This is required for Create React App (CRA) to load the variables correctly.

1. In the "Value" field, enter the new value for the constant (e.g., "New Home Page").
1. Click the "OK" button to save the new application setting.

![image](https://github.com/KrishnanTGB/Azure-AppService-Config--React/assets/45973601/bfab6195-1764-4ea7-be4e-d00bc400b504)

### Access Application Setting
- Once the application setting is saved, your React application can access it using the **process.env** object.
- For example, in your React component, where you render the label, you can modify it as follows:

   _azure-app-config\src\presentation\containers\home\index.tsx_

```
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
```

- By using **process.env.REACT_APP_LABEL_NAME**, your React application will dynamically fetch the value from the environment variable set in the Azure App Service configuration.

### What is **process.env**?
- process.env is a Node.js global object that provides access to the environment variables of the current process. In the context of a React application, which is typically bundled and executed by Node.js, process.env allows you to access environment variables that are set in the hosting environment, such as Azure App Service.

- Environment variables are key-value pairs that can be used to configure and customize your application's behavior without modifying the source code. They provide a way to pass runtime-specific configuration to your application.

- When you define an environment variable in the Azure App Service configuration, it becomes accessible through process.env within your React application.

- For example:

  `const labelName = process.env.REACT_APP_LABEL_NAME || 'Default Label';`

- The process.env.REACT_APP_LABEL_NAME expression retrieves the value of the REACT_APP_LABEL_NAME environment variable that you set in the Azure App Service configuration. If the environment variable is defined, it will use that value. If it's not defined (or its value is empty or falsy), it will fallback to the default value 'Default Label'.

- By leveraging process.env, you can make your React application adapt to different environments or configuration changes without requiring code modifications or redeployments. It provides flexibility in managing dynamic values in your application based on the hosting environment's configuration.

## Observations on Updating Configurations in App Services
- Here's the screen shots for the compiled version of code deployed in Azure App Service.
- Now the values are coming from the App Setting variables in Azure App Service configuration.

![image](https://github.com/KrishnanTGB/Azure-AppService-Config--React/assets/45973601/6606b5a2-9699-4884-8611-138862a0fb8e)

![image](https://github.com/KrishnanTGB/Azure-AppService-Config--React/assets/45973601/d89f7e4a-393f-436b-8f8b-d7075ba93df8)

- Logs captured on how much time it will take once we update any configuration in the App Service,

```
13:15:27 - Changed Configuration.
13:16:00 - Restarted App Services.
13:18:00 - Did an empty cache hard refresh - no changes in UI.
13:20:00 - Did a refresh and keep on it is refreshing until 13:21:40
13:21:40 - Configuration reflected in Front end.
```
- We can observe that of _**maximum time 10 mins** to reflect the Configuration updates_ happened through App Service.
