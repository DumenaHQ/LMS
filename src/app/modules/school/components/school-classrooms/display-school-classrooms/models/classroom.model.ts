export type ClassroomModel = {
  terms?:         Term[];
  template?:      Template;
  name?:          string;
  description?:   string;
  school_id?:     string;
  thumbnail?:     string;
  header_photo?:  string;
  courses?:       Course[];
  status?:        string;
  learners?:      any[];
  createdAt?:     Date;
  updatedAt?:     Date;
  id?:            string;
  active_term?:   ActiveTerm;
  learner_count?: number;
  course_count?:  number;
  teacher?:       Teacher;
}

export type ActiveTerm = {
  title?:              string;
  defaultDateChanged?: boolean;
  start_date?:         Date;
  end_date?:           Date;
}

export type Course = {
  title?:            string;
  description?:      string;
  tags?:             string[];
  difficulty_level?: string;
  course_quadrant?:  string;
  access_scopes?:    string[];
  modules?:          Module[];
  createdAt?:        Date;
  updatedAt?:        Date;
  quiz_id?:          string;
  id?:               string;
  module_count?:     number;
  lesson_count?:     number;
  duration?:         string;
}

export type Module = {
  title?:                 string;
  objectives?:            string;
  further_reading?:       string;
  further_reading_links?: string;
  class_activities?:      string;
  code_example?:          string;
  instructor?:            string;
  lessons?:               Lesson[];
  date_added?:            Date;
  id?:                    string;
}

export type Lesson = {
  id?: string;
}

export type Teacher = {
  id?:       string;
  fullname?: string;
  email?:    string;
}

export type Template = {
  terms?:     any[];
  title?:     string;
  courses?:   string[];
  status?:    string;
  createdAt?: Date;
  updatedAt?: Date;
  id?:        string;
}

export type Term = {
  title?:              string;
  courses?:            any[];
  defaultDateChanged?: boolean;
  start_date?:         Date;
  end_date?:           Date;
}
