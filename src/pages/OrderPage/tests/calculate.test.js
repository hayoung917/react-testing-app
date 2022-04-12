import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import { OrderContextProvider } from "../../../contexts/OrderContext";
import Type from "../Type";
import OrderPage from "../OrderPage";

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

describe("total price of goods and options", () => {
  test("total price starts with 0 and updating total price when adding one product", async () => {
    render(<OrderPage />);

    const total = screen.getByText("총 금액: ", { exact: false });
    expect(total).toHaveTextContent("0");

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");

    expect(total).toHaveTextContent("1000");
  });

  test("Updating total price when adding one option", async () => {
    render(<OrderPage />);

    const total = screen.getByText("총 금액: ", { exact: false });
    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    userEvent.click(insuranceCheckbox);

    expect(total).toHaveTextContent("500");
  });

  test("Updating total price when removing option and product", async () => {
    render(<OrderPage />);

    const total = screen.getByText("총 금액: ", { exact: false });
    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    userEvent.click(insuranceCheckbox);

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "3");

    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");

    expect(total).toHaveTextContent("1500");
  });
});
