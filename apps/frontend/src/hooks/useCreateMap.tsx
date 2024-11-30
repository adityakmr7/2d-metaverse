import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMapSchema } from "@repo/utils/zodSchema";
import { createMap, getAllMap } from "@/redux/slice/AdminSlice.ts";
import { toast } from "@/hooks/use-toast.ts";
import { z } from "zod";

type MapFormValues = z.infer<typeof CreateMapSchema>;
const useCreateMap = () => {
  const [maps, setMaps] = useState<MapFormValues[]>([]);
  const { mapList } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const form = useForm<MapFormValues>({
    resolver: zodResolver(CreateMapSchema),
    defaultValues: {
      thumbnail: "",
      dimensions: "",
      name: "",
      defaultElements: [{ elementId: "", x: 0, y: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "defaultElements",
  });

  function onSubmit(values: MapFormValues) {
    // Here you would typically send this data to your API
    console.log(values);
    dispatch(
      createMap({
        name: values.name,
        dimensions: values.dimensions,
        defaultElements: values.defaultElements,
        thumbnail: values.thumbnail,
      }),
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        toast({
          title: "Map created",
          description: `Created map: ${values.name}`,
        });
      } else {
        toast({
          title: "Map creation failed ",
        });
      }
    });
    setMaps([...maps, values]);

    form.reset();
  }

  useEffect(() => {
    dispatch(getAllMap());
  }, []);
  return {
    mapList,
    onSubmit,
    fields,
    append,
    remove,
    form,
  };
};

export default useCreateMap;
