import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <section className="mt-12">
        <div className="container mx-auto border-t flex flex-col gap-6 md:flex-row md:gap-12 px-6 py-12 text-sm">
          <Link href="/" className="text-base font-bold">
            Virtual Park In
          </Link>
          <ul className="space-y-4">
            <li>
              <Link href="/" className="hover:underline hover:text-orange-600">
                หน้าแรก
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:underline hover:text-orange-600"
              >
                เกี่ยวกับ
              </Link>
            </li>
            <li>
              <Link
                href="/terms-conditions"
                className="hover:underline hover:text-orange-600"
              >
                ข้อกำหนดและเงื่อนไข
              </Link>
            </li>
            <li>
              <Link
                href="/shipping-return-policy"
                className="hover:underline hover:text-orange-600"
              >
                นโยบายการจัดส่งและการคืนสินค้า
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:underline hover:text-orange-600"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="border-t px-4 py-6 text-sm">
        <div className="container mx-auto flex justify-between">
          <div>
            &copy; {new Date().getFullYear()} Virtual Park In. All Rights
            Reserved.
          </div>
          <div>
            <Link href="#">Facebook</Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
