export type SchoolAnalyticsModel = {
  school?:                    string;
  address?:                   string;
  resident_state?:            string;
  user?:                      string;
  createdAt?:                 Date;
  updatedAt?:                 Date;
  id?:                        string;
  totalInstructorsOnboarded?: number;
  totalLearnersOnboarded?:    number;
  totalClasses?:              number;
}
