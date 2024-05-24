"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMaskito } from "@maskito/react";
import ReactInputMask from "react-input-mask";

const formSchema = z.object({
  username: z
    .string({ required_error: "Preencha todos os campos" })
    .min(2, {
      message: "O nome do produto precisa ter pelo menos 2 caracteres.",
    })
    .refine((val) => /^[^\d]*$/.test(val), {
      message: "O nome do produto não pode conter números.",
    }),
  preco: z.coerce.number({
    required_error: "Preencha todos os campos",
    message: "Digite um número",
  }),
  cor: z
    .string({ required_error: "Preencha todos os campos" })
    .min(2, {
      message: "A cor do produto precisa ter pelo menos 2 caracteres",
    })
    .refine((val) => /^[^\d]*$/.test(val), {
      message: "O nome do produto não pode conter números.",
    }),
  tamanho: z.string({ required_error: "Preencha todos os campos" }).max(2),
});

export function zodValidation(values) {
  const username = z.string().min(2);
  const preco = z.number();
  const cor = z.string().min(2);
  const tamanho = z.string().max(2);

  const val1 = username.safeParse(values.username);
  const val2 = preco.safeParse(values.preco);
  const val3 = cor.safeParse(values.cor);
  const val4 = tamanho.safeParse(values.tamanho);

  if (val1.success && val2.success && val3.success && val4.success) {
    return true;
  } else {
    return false;
  }
}

const moneyMask = {
  mask: /^\d+$/,
};

export default function ProfileForm({ data, setData }) {
  const inputRef = useMaskito({ options: moneyMask });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    console.log;
    if (zodValidation(values)) {
      setData([...data, values]);
      toast(
        <div className="flex flex-col">
          <span className="font-bold">Produto adicionado:</span>
          <span>Nome: {values.username}</span>
          <span>Preço: {values.preco}</span>
          <span>Cor: {values.cor}</span>
          <span>Tamanho: {values.tamanho}</span>
        </div>,
      );
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Nome exibido do produto</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <div className="flex items-baseline">
                <span className="text-muted-foreground">R$&nbsp;</span>
                <FormControl>
                  <Input
                    type="text"
                    ref={inputRef}
                    onInput={(e) => {
                      form.setValue("preco", e.currentTarget.value);
                    }}
                    {...field}
                  />
                </FormControl>
              </div>
              <FormDescription>Preço sem impostos do produto</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor</FormLabel>
              <FormControl>
                <Input type="text" placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Cor do produto</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tamanho"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tamanho</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tamanho" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PP">PP</SelectItem>
                  <SelectItem value="P">P</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="GG">GG</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Tamanho do produto</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
