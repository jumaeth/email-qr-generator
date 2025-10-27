"use client"

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useFormContext} from "react-hook-form";

interface EmailGeneratorFieldsProps {
  prefix?: string
}

export function EmailGeneratorFields({ prefix }: EmailGeneratorFieldsProps) {
  const { control } = useFormContext()

  const fieldName = (name: string) => (prefix ? `${prefix}.${name}` : name)

  return (
    <>
      <FormField
        control={control}
        name={fieldName("email")}
        render={({field}) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="me@example.com"
                className="col-span-3"
                {...field}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={fieldName("name")}
        render={({field}) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="John Doe"
                className="col-span-3"
                {...field}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={fieldName("description")}
        render={({field}) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input
                placeholder="Work Email"
                className="col-span-3"
                {...field}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={fieldName("organization")}
        render={({field}) => (
          <FormItem>
            <FormLabel>Organization</FormLabel>
            <FormControl>
              <Input
                placeholder="YUW"
                className="col-span-3"
                {...field}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
    </>
  )
}