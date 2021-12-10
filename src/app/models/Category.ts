export interface Category {
    id:string,
    name:string,
    subCategories?:SubCategory[]
}

export interface SubCategory {
  name:string
}
