import "@testing-library/jest-dom";
import { zodValidation } from "@/components/form/form";

test("Testa valores do formulário de adição de produto. Primeiro teste tem valores válidos, segundo tem nome errado, terceiro tem preço errado, quarto tem cor errada e último tem tamanho errado", () => {
  expect(
    zodValidation({
      username: "Teste1",
      preco: 11,
      cor: "Vermelho",
      tamanho: "G",
    }),
  ).toBe(true);
  expect(
    zodValidation({
      username: 2,
      preco: 11,
      cor: "Vermelho",
      tamanho: "G",
    }),
  ).toBe(false);
  expect(
    zodValidation({
      username: "Teste3",
      preco: "Preço em string",
      cor: "Vermelho",
      tamanho: "G",
    }),
  ).toBe(false);
  expect(
    zodValidation({
      username: "Teste4",
      preco: 11,
      cor: 2,
      tamanho: "G",
    }),
  ).toBe(false);
  expect(
    zodValidation({
      username: "Teste5",
      preco: 11,
      cor: "Vermelho",
      tamanho: 3,
    }),
  ).toBe(false);
});
