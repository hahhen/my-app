"use client";

import { buttonVariants } from "@/components/ui/button";
import Sidebar from "@/components/general/sidebar";
import Header from "@/components/general/header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "@/components/form/form";
import Products from "@/components/products/products";
import React from "react";

export default function Dashboard() {
  const [data, setData] = React.useState([]);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Produtos</h1>
            {data.length > 0 && (
              <Dialog>
                <DialogTrigger className={buttonVariants() + "mt-4"}>
                  Adicionar produto
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar produto</DialogTitle>
                    <DialogDescription>
                      Preencha os campos para adicionar um produto.
                    </DialogDescription>
                  </DialogHeader>
                  <Form data={data} setData={setData} />
                </DialogContent>
              </Dialog>
            )}
          </div>

          {data.length > 0 ? (
            <Products data={data} setData={setData} />
          ) : (
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  Você ainda não possui produtos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Quando um produto for adicionado, você o verá aqui
                </p>
                <Dialog>
                  <DialogTrigger className={buttonVariants() + "mt-4"}>
                    Adicionar produto
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar produto</DialogTitle>
                      <DialogDescription>
                        Preencha os campos para adicionar um produto.
                      </DialogDescription>
                    </DialogHeader>
                    <Form data={data} setData={setData} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
