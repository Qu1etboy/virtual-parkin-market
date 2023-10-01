import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Rating from "@mui/material/Rating";
import { Review, User } from "@prisma/client";
import { format, formatDistance } from "date-fns";
import { th } from "date-fns/locale";
import { FILE_URL } from "@/services/upload";

export default function ReviewCard({
  review,
}: {
  review: Review & { user: User };
}) {
  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={`${FILE_URL}/${review.user.image}`} />
          <AvatarFallback>{review.user.name![0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Rating
            name="read-only"
            value={review.rating}
            size="small"
            readOnly
          />
          <h3 className="font-semibold">{review.user.name}</h3>
          <span
            className="text-sm text-gray-600"
            title={`รีวิวเมื่อ ${format(review.createdAt, "PPP", {
              locale: th,
            })}`}
          >
            {formatDistance(new Date(), review.createdAt, { locale: th })}{" "}
            ที่แล้ว
          </span>
        </div>
      </div>
      <article className="prose max-w-none pl-12 py-2">
        {review.content}
      </article>
    </div>
  );
}
