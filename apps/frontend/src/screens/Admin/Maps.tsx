import { useState } from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast.ts";
import Layout from "@/components/Admin/Layout.tsx";
import { CreateMapSchema } from "@repo/utils/zodSchema";
import { useAppDispatch } from "@/redux/hooks.ts";
import { createMap } from "@/redux/slice/AdminSlice.ts";

type MapFormValues = z.infer<typeof CreateMapSchema>;

function Maps() {
  const [maps, setMaps] = useState<MapFormValues[]>([]);
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

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Manage Maps</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Map</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/thumbnail.png"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dimensions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dimensions (e.g., 1000x1000)</FormLabel>
                        <FormControl>
                          <Input placeholder="Width x Height" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Map name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`defaultElements.${index}.elementId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Element ID</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`defaultElements.${index}.x`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>X Position</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`defaultElements.${index}.y`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Y Position</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        Remove Element
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ elementId: "", x: 0, y: 0 })}
                  >
                    Add Default Element
                  </Button>
                  <Button type="submit">Create Map</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Existing Maps</CardTitle>
            </CardHeader>
            <CardContent>
              {maps.length === 0 ? (
                <p>No maps created yet.</p>
              ) : (
                <ul className="space-y-2">
                  {maps.map((map, index) => (
                    <li key={index} className="border p-2 rounded">
                      <strong>{map.name}</strong>
                      <br />
                      <strong>Dimensions:</strong> {map.dimensions}
                      <br />
                      <strong>Thumbnail:</strong> {map.thumbnail}
                      <br />
                      <strong>Default Elements:</strong>{" "}
                      {map.defaultElements.length}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Maps;
