import { ISpecialCountryFields } from "../types/types";

export default class usefulServices {
  static capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static getCountries(): ISpecialCountryFields[] {
    return [
      {
        name: "spain",
        firstName: true,
        lastName: true,
        dob: true,
        holidayAllowance: true,
        maritalStatus: true,
        SIN: true,
        minHolidayAllowance: 30,
      },
      {
        name: "ghana",
        firstName: true,
        lastName: true,
        dob: true,
        holidayAllowance: true,
        maritalStatus: true,
        numberOfChildren: true,
      },
      {
        name: "brazil",
        firstName: true,
        lastName: true,
        dob: true,
        holidayAllowance: true,
        workingHours: true,
        maxHolidayAllowance: 40,
      },
    ];
  }

  static getCountryNames(): string[] {
    return this.getCountries().map((val: ISpecialCountryFields) => val.name);
  }

  static getCountryByName(name: string): ISpecialCountryFields {
    return this.getCountries().filter(
      (val: ISpecialCountryFields) => val.name === name
    )[0];
  }

  static getMaritalSatuses(): string[] {
    return ["single", "married", "widow", "widower", "divorced"];
  }
}
