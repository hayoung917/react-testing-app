import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import { OrderContextProvider } from "../../../contexts/OrderContext";
import Type from "../Type";

test("update product's total when products change", async () => {
  render(<Type orderType="products" />, { wrapper: OrderContextProvider });

  // 여행 상품 가격은 0원 부터 시작
  const productsTotal = screen.getByText("총 가격: ", { exact: false });
  expect(productsTotal).toHaveTextContent("0");

  // 아메리카 여행 상품 한 개 올리기
  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, "1");
  expect(productsTotal).toHaveTextContent("1000");

  // 영국 여행 상품 3개 더 올리기
  const englandInput = await screen.findByRole("spinbutton", {
    name: "England",
  });
  userEvent.type(englandInput, "3");
  expect(productsTotal).toHaveTextContent("4000");
});

test("update options's total when options change", async () => {
  render(<Type orderType="options" />);

  // 옵션 총 가격이 0부터 시작
  const optionsTotal = screen.getByText("총 가격: ", { exact: false });
  expect(optionsTotal).toHaveTextContent("0");

  // 보험 옵션 추가
  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  userEvent.click(insuranceCheckbox);

  // 디너 옵션 추가
  const dinnerCheckbox = await screen.findByRole("checkbox", {
    name: "Dinner",
  });
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("1000");

  // 디너 옵션 제거
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("500");
});
