import { Model } from 'mongoose';
export type MonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type ISemesterTitle = 'Autumn' | 'Summer' | 'Fall';

export type ISemesterCode = '01' | '02' | '03';

export type IAcademicSemester = {
  title: 'Autumn' | 'Summer' | 'Fall';
  year: number;
  code: '01' | '02' | '03';
  startMonth: MonthName;
  endMonth: MonthName;
};

export type IAcademicSemesterModel = Model<IAcademicSemester>;
