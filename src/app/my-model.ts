export interface Annotation {
    start: number;
    end: number;
    label: string;
    selectedText: string;
  }
  
  export interface MyModel {
    document: string;
    annotations: Annotation[];
  }