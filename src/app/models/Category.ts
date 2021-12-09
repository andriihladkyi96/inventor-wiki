export interface Category {
    id:string,
    name:string,
    subCategories?:SubCategory[]
}

export interface SubCategory {
  id:string,
  name:string
}
