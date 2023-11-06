// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import React from "react";

type FieldProps = {
  label: any;
  defaultValue: any;
  form?: React.ReactNode;
  editable?: boolean;
  isLoading?: boolean;
  onSubmit?: () => Promise<void>;
  reset: () => void;
};

const Field = ({
  editable,
  label,
  defaultValue,
  form,
  isLoading,
  reset,
  onSubmit,
}: FieldProps) => {
  const [edit, setEdit] = React.useState(false);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 p-4 border-b last:border-none">
      <div className="col-span-4 flex justify-between text-sm font-semibold">
        {label}

        {editable && !edit ? (
          <button
            type="button"
            onClick={() => setEdit((prev) => !prev)}
            className="text-orange-600 font-normal text-sm hover:underline md:hidden block"
          >
            แก้ไข
          </button>
        ) : null}
      </div>
      <div className="col-span-6">
        {edit ? (
          <>
            {form}
            <div className="mt-2">
              <Button type="submit" disabled={isLoading} className="mr-2">
                {/* {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )} */}
                บันทึก
              </Button>
              <Button
                type="submit"
                variant="secondary"
                disabled={isLoading}
                onClick={() => {
                  reset();
                  setEdit(false);
                }}
                // className="w-full px-3 py-4 rounded-sm text-white my-6"
              >
                {/* {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )} */}
                ยกเลิก
              </Button>
            </div>
          </>
        ) : (
          <span className="text-gray-600 dark:text-gray-300 text-sm">
            {defaultValue ? defaultValue : "-"}
          </span>
        )}
      </div>
      {editable && !edit ? (
        <button
          type="button"
          onClick={() => setEdit((prev) => !prev)}
          className="text-orange-600 text-sm hover:underline hidden md:block"
        >
          แก้ไข
        </button>
      ) : null}
    </div>
  );
};

export default Field;
