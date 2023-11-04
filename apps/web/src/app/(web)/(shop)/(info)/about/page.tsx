import React from "react";
import InfoLayout from "../info-layout";

export default function AboutPage() {
  return (
    <>
      <div className="w-full h-[300px]">
        <img
          src="https://img.wongnai.com/p/1920x0/2020/08/08/6d834add42204a3fb991dff27a819cbe.jpg"
          alt="Park In Market banner"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <InfoLayout title="เกี่ยวกับเรา">
        <p>ตลาดสุดชิคใจกลางบางแสนในบรรยากาศสวนสวย</p>
      </InfoLayout>
    </>
  );
}
