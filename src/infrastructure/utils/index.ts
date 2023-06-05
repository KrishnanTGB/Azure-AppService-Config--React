export class UtilityService {
  /**
   * Function to set the page title
   * @param   {string} titleText  title of the page
   */
  static setPageTitle = (titleText: string) => {
    document.title = titleText;
  };
  
}
