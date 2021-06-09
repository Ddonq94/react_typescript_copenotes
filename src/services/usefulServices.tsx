const companyTypes = ["super", "company"];
const areaTypes = ["super", "company", "area"];
const types = ["super", "company", "area", "location"];

export default class usefulServices {
  static capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static getCoyTypes = (): string[] => {
    return companyTypes;
  };

  static getAreaTypes = (): string[] => {
    return areaTypes;
  };

  static getTypes = (): string[] => {
    return types;
  };
}
