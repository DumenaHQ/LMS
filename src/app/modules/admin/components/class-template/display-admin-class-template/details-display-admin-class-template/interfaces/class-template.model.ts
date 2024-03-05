export interface ClassTemplateDetailModel {
    title?:     string;
    syllabus?:  string;
    courses?:   Course[];
    status?:    string;
    createdAt?: Date;
    updatedAt?: Date;
    id?:        string;
}

export interface Course {
    title?:            string;
    description?:      string;
    tags?:             any[];
    difficulty_level?: string;
    course_quadrant?:  string;
    access_scopes?:    string[];
    modules?:          Module[];
    createdAt?:        Date;
    updatedAt?:        Date;
    id?:               string;
    module_count?:     number;
    lesson_count?:     number;
    duration?:         string;
}

export interface Module {
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

export interface Lesson {
    id?: string;
}
