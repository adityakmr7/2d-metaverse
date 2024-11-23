import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { CreateSpaceSchema } from "@repo/utils/zodSchema";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { createSpace, fetchAllSpace } from "@/redux/slice/SpaceSlice.ts";

type SpaceFormValues = z.infer<typeof CreateSpaceSchema>;

function Spaces() {
  const [spaces, setSpaces] = useState<SpaceFormValues[]>([]);
  const { spaceList } = useAppSelector((state) => state.space);
  const dispatch = useAppDispatch();
  const form = useForm<SpaceFormValues>({
    resolver: zodResolver(CreateSpaceSchema),
    defaultValues: {
      name: "",
      dimensions: "",
    },
  });

  function onSubmit(values: SpaceFormValues) {
    // Here you would typically send this data to your API
    console.log(values);
    dispatch(
      createSpace({
        name: values.name,
        dimensions: values.dimensions,
      }),
    ).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
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
  useEffect(() => {
    if (spaceList.length <= 0) {
      dispatch(fetchAllSpace());
    }
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Manage Spaces</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Space</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Space name" {...field} />
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
                  <Button type="submit">Create Space</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Existing Spaces</CardTitle>
            </CardHeader>
            <CardContent>
              {spaceList.length === 0 ? (
                <p>No spaces created yet.</p>
              ) : (
                <ul className="space-y-2">
                  {spaceList.map((space, index) => (
                    <li key={index} className="border p-2 rounded">
                      <strong>{space.name}</strong> - {space.dimensions}
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

export default Spaces;
