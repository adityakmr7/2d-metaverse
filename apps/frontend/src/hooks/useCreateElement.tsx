import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateElementSchema } from "@repo/utils/zodSchema";
import { createElement, getAllElement } from "@/redux/slice/AdminSlice.ts";
import { toast } from "@/hooks/use-toast.ts";
import { z } from "zod";

type ElementFormValues = z.infer<typeof CreateElementSchema>;
const useCreateElement = () => {
  const [elements, setElements] = useState<ElementFormValues[]>([]);
  const dispatch = useAppDispatch();
  const { elementList } = useAppSelector((state) => state.admin);

  const form = useForm<ElementFormValues>({
    resolver: zodResolver(CreateElementSchema),
    defaultValues: {
      imageUrl: "",
      width: 0,
      height: 0,
      static: false,
    },
  });

  function onSubmit(values: ElementFormValues) {
    dispatch(
      createElement({
        imageUrl: values.imageUrl,
        width: values.width,
        height: values.height,
        static: values.static,
      }),
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        toast({
          title: "Element created",
          description: `Created element: ${values.imageUrl}`,
        });
      } else {
        toast({
          title: "Element creation failed ",
        });
      }
    });

    setElements([...elements, values]);

    form.reset();
  }

  useEffect(() => {
    dispatch(getAllElement());
  }, []);
  return {
    elementList,
    onSubmit,
    form,
    elements,
    setElements,
  };
};

export default useCreateElement;
