export type ClassroomModel = {
  readonly terms?:         Term[];
  readonly school_id?:     string;
  readonly status?:        string;
  readonly createdAt?:     Date;
  readonly updatedAt?:     Date;
  readonly id?:            string;
  readonly learner_count?: number;
  readonly course_count?:  number;
  readonly thumbnail?:     string;
  readonly name?:          string;
  readonly description?:   string;
  readonly header_photo?:  string;
  readonly active_term?:   Term;
}

export type Term = {
  readonly title?:      string;
  readonly courses?:    any[];
  readonly start_date?: Date;
  readonly end_date?:   Date;
}
