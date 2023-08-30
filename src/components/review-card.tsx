import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function ReviewCard({ review }: { review: any }) {
  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="a" />
          <AvatarFallback>{review.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold">{review.author}</h3>
          <span className="text-sm text-gray-600">
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(review.createdAt)}
          </span>
        </div>
      </div>
      <article className="prose max-w-none pl-12 py-2">
        {review.content}
      </article>
    </div>
  );
}
