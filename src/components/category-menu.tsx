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
  { id: 1, name: "อิเล็กทรอนิกส์", icon: <Plug /> },
  { id: 2, name: "เสื้อผ้า", icon: <Shirt /> },
  { id: 3, name: "เฟอร์นิเจอร์", icon: <Armchair /> },
  { id: 4, name: "ความงาม", icon: <SmilePlus /> },
  { id: 5, name: "หนังสือ", icon: <Book /> },
  { id: 6, name: "กีฬา", icon: <Medal /> },
  { id: 7, name: "ของเล่น", icon: <ToyBrick /> },
  { id: 8, name: "สุขภาพ", icon: <HeartPulse /> },
  { id: 9, name: "ของชำร่วย", icon: <Apple /> },
  { id: 10, name: "ยานยนต์", icon: <Car /> },
  { id: 11, name: "สัตว์เลี้ยง", icon: <Dog /> },
  { id: 12, name: "เครื่องประดับ", icon: <Gem /> },
  { id: 13, name: "ศิลปะ", icon: <Brush /> },
  { id: 14, name: "เครื่องมือ", icon: <Hammer /> },
  { id: 15, name: "เด็ก", icon: <Baby /> },
];

export default function CategoryMenu() {
  return (
    <nav className="flex overflow-x-scroll pt-3 pb-6 mb-6">
      <ul className="flex gap-5">
        {productCategories.map((category) => (
          <li key={category.name}>
            <Link
              href={`/products/?category=${category.id}`}
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
