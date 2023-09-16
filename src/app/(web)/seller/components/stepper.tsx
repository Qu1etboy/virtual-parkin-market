import { Form } from "@/components/ui/form";
import React, { Children } from "react";
import { UseFormReturn } from "react-hook-form";

interface StepProps {
  number: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function Step({ number, title, description, children }: StepProps) {
  return (
    <section className="bg-white rounded-lg p-4 space-y-6 w-full max-w-3xl mx-auto">
      <div className="flex gap-5">
        <div className="flex justify-center items-center rounded-full bg-orange-100 text-orange-900 w-14 h-14">
          {number}
        </div>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

// export function Stepper({
//   form,
//   children,
// }: {
//   form: UseFormReturn;
//   children: React.ReactNode;
// }) {
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
//         {children}
//       </form>
//     </Form>
//   );
// }
