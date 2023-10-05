import { ProductCategory } from "@prisma/client";

export const productCategories = [
  { id: 0, name: "ทั้งหมด", value: null },
  { id: 1, name: "อิเล็กทรอนิกส์", value: ProductCategory.Electronics },
  { id: 2, name: "เสื้อผ้า", value: ProductCategory.Apparel },
  { id: 3, name: "เฟอร์นิเจอร์", value: ProductCategory.Furniture },
  { id: 4, name: "ความงาม", value: ProductCategory.Beauty },
  { id: 5, name: "หนังสือ", value: ProductCategory.Books },
  { id: 6, name: "กีฬา", value: ProductCategory.Sports },
  { id: 7, name: "ของเล่น", value: ProductCategory.Toys },
  { id: 8, name: "สุขภาพ", value: ProductCategory.Wellness },
  { id: 9, name: "ของชำร่วย", value: ProductCategory.Groceries },
  { id: 10, name: "ยานยนต์", value: ProductCategory.Automotive },
  { id: 11, name: "สัตว์เลี้ยง", value: ProductCategory.Pets },
  { id: 12, name: "เครื่องประดับ", value: ProductCategory.Jewelry },
  { id: 13, name: "ศิลปะ", value: ProductCategory.Art },
  { id: 14, name: "เครื่องมือ", value: ProductCategory.Tools },
  { id: 15, name: "เด็ก", value: ProductCategory.Baby },
];
