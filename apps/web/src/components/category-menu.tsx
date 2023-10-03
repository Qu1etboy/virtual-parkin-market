import { ProductCategory } from "@prisma/client";
import {
  Apple,
  Armchair,
  Baby,
  Book,
  Brush,
  Car,
  Dog,
  Gem,
  Hammer,
  HeartPulse,
  Medal,
  Plug,
  Shirt,
  SmilePlus,
  ToyBrick,
} from "lucide-react";
import Link from "next/link";
import React from "react";

// const productCategories = [
//   { name: "Electronics", icon: <Plug /> },
//   { name: "Apparel", icon: <Shirt /> },
//   { name: "Furniture", icon: <Armchair /> },
//   { name: "Beauty", icon: <SmilePlus /> },
//   { name: "Books", icon: <Book /> },
//   { name: "Sports", icon: <Medal /> },
//   { name: "Toys", icon: <ToyBrick /> },
//   { name: "Wellness", icon: <HeartPulse /> },
//   { name: "Groceries", icon: <Apple /> },
//   { name: "Automotive", icon: <Car /> },
//   { name: "Pets", icon: <Dog /> },
//   { name: "Jewelry", icon: <Gem /> },
//   { name: "Art", icon: <Brush /> },
//   { name: "Tools", icon: <Hammer /> },
//   { name: "Baby", icon: <Baby /> },
// ];

const productCategories = [
  {
    id: 1,
    name: "อิเล็กทรอนิกส์",
    icon: <Plug />,
    value: ProductCategory.Electronics,
  },
  { id: 2, name: "เสื้อผ้า", icon: <Shirt />, value: ProductCategory.Apparel },
  {
    id: 3,
    name: "เฟอร์นิเจอร์",
    icon: <Armchair />,
    value: ProductCategory.Furniture,
  },
  {
    id: 4,
    name: "ความงาม",
    icon: <SmilePlus />,
    value: ProductCategory.Beauty,
  },
  { id: 5, name: "หนังสือ", icon: <Book />, value: ProductCategory.Books },
  { id: 6, name: "กีฬา", icon: <Medal />, value: ProductCategory.Sports },
  { id: 7, name: "ของเล่น", icon: <ToyBrick />, value: ProductCategory.Toys },
  {
    id: 8,
    name: "สุขภาพ",
    icon: <HeartPulse />,
    value: ProductCategory.Wellness,
  },
  {
    id: 9,
    name: "ของชำร่วย",
    icon: <Apple />,
    value: ProductCategory.Groceries,
  },
  { id: 10, name: "ยานยนต์", icon: <Car />, value: ProductCategory.Automotive },
  { id: 11, name: "สัตว์เลี้ยง", icon: <Dog />, value: ProductCategory.Pets },
  {
    id: 12,
    name: "เครื่องประดับ",
    icon: <Gem />,
    value: ProductCategory.Jewelry,
  },
  { id: 13, name: "ศิลปะ", icon: <Brush />, value: ProductCategory.Art },
  {
    id: 14,
    name: "เครื่องมือ",
    icon: <Hammer />,
    value: ProductCategory.Tools,
  },
  { id: 15, name: "เด็ก", icon: <Baby />, value: ProductCategory.Baby },
];

export default function CategoryMenu() {
  return (
    <nav className="flex overflow-x-scroll pt-3 pb-6 mb-6">
      <ul className="flex gap-5">
        {productCategories.map((category) => (
          <li key={category.name}>
            <Link
              href={`/products/?category=${category.value}`}
              className="text-sm text-gray-600 hover:text-orange-600 duration-300 flex flex-col items-center gap-3 p-3"
            >
              <span>{category.icon}</span>
              <span className="whitespace-nowrap">{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
