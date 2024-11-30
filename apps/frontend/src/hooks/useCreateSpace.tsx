import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateSpaceSchema } from "@repo/utils/zodSchema";
import { createSpace, fetchAllSpace } from "@/redux/slice/SpaceSlice.ts";
import { toast } from "@/hooks/use-toast.ts";
import { z } from "zod";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks.ts";

type SpaceFormValues = z.infer<typeof CreateSpaceSchema>;

const useCreateSpace = () => {
  const [spaces, setSpaces] = useState<SpaceFormValues[]>([]);
  const dispatch = useAppDispatch();
  const form = useForm<SpaceFormValues>({
    resolver: zodResolver(CreateSpaceSchema),
    defaultValues: {
      name: "",
      dimensions: "",
      thumbnail: "",
    },
  });

  function onSubmit(values: SpaceFormValues) {
    dispatch(
      createSpace({
        name: values.name,
        dimensions: values.dimensions,
        thumbnail: values.thumbnail,
      }),
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(fetchAllSpace());
        toast({
          title: "Space created",
          description: `Created space: ${values.name}`,
        });
      } else {
        toast({
          title: "Space creation failed ",
        });
      }
    });
    setSpaces([...spaces, values]);

    form.reset();
  }
  return { onSubmit };
};

export default useCreateSpace;
