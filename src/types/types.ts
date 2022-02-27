export interface ICountryFields {
  name: string;
  firstName: boolean;
  lastName: boolean;
  dob: boolean;
  holidayAllowance: boolean;
}

export interface ISpecialCountryFields extends ICountryFields {
  maritalStatus?: boolean;
  SIN?: boolean;
  minHolidayAllowance?: number;
  maxHolidayAllowance?: number;
  numberOfChildren?: boolean;
  workingHours?: boolean;
}

export interface IRegisterObject {
  country: string;
  firstName: string;
  lastName: string;
  dob: string;
  holidayAllowance: number;
  maritalStatus?: string;
  SIN?: string;
  numberOfChildren?: number;
  workingHours?: number;
}

export interface Icomponent {
  testID?: string;
}
