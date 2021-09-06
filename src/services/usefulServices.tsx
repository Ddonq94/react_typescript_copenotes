import exportFromJSON from "export-from-json";

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

  static csv = (dt: any, file: string, type: any): void => {
    const data = dt || [{ foo: "foo" }, { bar: "bar" }];
    const fileName = file || "download";
    const exportType = type || "csv";

    exportFromJSON({ data, fileName, exportType });
  };

  static pdf = (dt: any, file: string, type: any): void => {
    alert("Coming Soon");
  };
}
