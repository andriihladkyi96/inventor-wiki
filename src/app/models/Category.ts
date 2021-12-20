import {Role} from "./Role";

export interface Category {
  id:string,
  name:string,
  subCategories?:SubCategory[],
  role:string[]
}

export interface SubCategory {
  name:string
}
