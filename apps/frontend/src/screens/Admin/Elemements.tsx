import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { CreateElementSchema } from "@repo/utils/zodSchema";
import { useAppDispatch } from "@/redux/hooks.ts";
import { createElement } from "@/redux/slice/AdminSlice.ts";

type ElementFormValues = z.infer<typeof CreateElementSchema>;

function Elements() {
  const [elements, setElements] = useState<ElementFormValues[]>([]);
  const dispatch = useAppDispatch();

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

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Manage Space Elements</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Element</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.png"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width</FormLabel>
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
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height</FormLabel>
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
                    name="static"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Static Element</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Create Element</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Existing Elements</CardTitle>
            </CardHeader>
            <CardContent>
              {elements.length === 0 ? (
                <p>No elements created yet.</p>
              ) : (
                <ul className="space-y-2">
                  {elements.map((element, index) => (
                    <li key={index} className="border p-2 rounded">
                      <strong>Image:</strong> {element.imageUrl}
                      <br />
                      <strong>Dimensions:</strong> {element.width}x
                      {element.height}
                      <br />
                      <strong>Static:</strong> {element.static ? "Yes" : "No"}
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

export default Elements;
