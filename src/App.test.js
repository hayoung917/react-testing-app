import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("From order to order completion", async () => {
  render(<App />);

  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, "2");

  const englandInput = await screen.findByRole("spinbutton", {
    name: "England",
  });
  userEvent.clear(englandInput);
  userEvent.type(englandInput, "3");

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  userEvent.click(insuranceCheckbox);

  const orderButton = screen.getByRole("button", {
    name: "주문하기",
  });
  userEvent.click(orderButton);

  // 주문 확인 페이지
  // 제목
  const summaryHeading = screen.getByRole("heading", {
    name: "주문 확인",
  });
  expect(summaryHeading).toBeInTheDocument();

  // 여행 상품 총 가격
  const productsHeading = screen.getByRole("heading", {
    name: "여행 상품: 5000",
  });
  expect(productsHeading).toBeInTheDocument();

  // 옵션 총 가격
  const optionHeading = screen.getByRole("heading", {
    name: "옵션: 500",
  });
  expect(optionHeading).toBeInTheDocument();

  // 특정 상품 나열
  expect(screen.getByText("2 America")).toBeInTheDocument();
  expect(screen.getByText("3 England")).toBeInTheDocument();
  expect(screen.getByText("Insurance")).toBeInTheDocument();

  // 체크 박스 체크
  const confirmCheckbox = screen.getByRole("checkbox", {
    name: "주문하려는 것을 확인하셨나요?",
  });
  userEvent.click(confirmCheckbox);

  // 버튼 클릭
  const confirmOrderButton = screen.getByRole("button", {
    name: "주문 확인",
  });
  userEvent.click(confirmOrderButton);

  // 주문 완료 페이지
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const completeHeader = await screen.findByRole("heading", {
    name: "주문이 성공했습니다.",
  });
  expect(completeHeader).toBeInTheDocument();

  // 데이터를 받아온 후에 loading 문구는 사라집니다.
  const loadingDisappeared = screen.queryByText("loading");
  expect(loadingDisappeared).not.toBeInTheDocument();

  // 첫번째 페이지로 버튼 클릭
  const firstPageButton = screen.getByRole("button", { name: "첫 페이지로" });
  userEvent.click(firstPageButton);

  // await waitFor(() => {
  //   screen.getByRole("spinbutton", { name: "America" });
  // });
  await screen.findByRole("spinbutton", { name: "America" });
});
