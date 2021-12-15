import {Role} from "./Role";

export interface Category {
  id:string,
  name:string,
  subCategories?:SubCategory[],
  role?:Role[]
}

export interface SubCategory {
  name:string
}
