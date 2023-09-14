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
  { name: "อิเล็กทรอนิกส์", icon: <Plug /> },
  { name: "เสื้อผ้า", icon: <Shirt /> },
  { name: "เฟอร์นิเจอร์", icon: <Armchair /> },
  { name: "ความงาม", icon: <SmilePlus /> },
  { name: "หนังสือ", icon: <Book /> },
  { name: "กีฬา", icon: <Medal /> },
  { name: "ของเล่น", icon: <ToyBrick /> },
  { name: "สุขภาพ", icon: <HeartPulse /> },
  { name: "ของชำร่วย", icon: <Apple /> },
  { name: "ยานยนต์", icon: <Car /> },
  { name: "สัตว์เลี้ยง", icon: <Dog /> },
  { name: "เครื่องประดับ", icon: <Gem /> },
  { name: "ศิลปะ", icon: <Brush /> },
  { name: "เครื่องมือ", icon: <Hammer /> },
  { name: "เด็ก", icon: <Baby /> },
];

export default function CategoryMenu() {
  return (
    <nav className="flex overflow-x-scroll pt-3 pb-6 mb-6">
      <ul className="flex gap-5">
        {productCategories.map((category) => (
          <li key={category.name}>
            <a
              href="#"
              className="text-sm text-gray-600 flex flex-col items-center gap-3 p-3"
            >
              <span>{category.icon}</span>
              <span className="whitespace-nowrap">{category.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
