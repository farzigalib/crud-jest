import { fireEvent, render, screen } from "@testing-library/react";
import App, { validateTask } from "./App";
import userEvent from "@testing-library/user-event";

test("renders header title", () => {
  render(<App />);
  const linkElement = screen.getByText(/curd/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders your task label in document", () => {
  const component = render(<App />);
  const label = component.getByLabelText("Your Task");
  expect(label).toBeInTheDocument();
});

describe("Let's test Main Container", () => {
  test("render the task form with save button", async () => {
    render(<App />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });

  test("should failed when user submit without task", () => {
    const testTask = "";
    expect(validateTask(testTask)).not.toBe(true);
  });

  test("should failed when user try to submit 'Do Work' task", () => {
    render(<App />);
    const taskField = screen.getByPlaceholderText("Add a Task...");
    userEvent.type(taskField, "Do your Work");
    expect(taskField.value).not.toMatch("Do Work");
  });

  test("Field input should be text type", () => {
    render(<App />);
    const taskField = screen.getByPlaceholderText("Add a Task...");
    expect(taskField).toHaveAttribute("type", "text");
  });

  test("input field should be Hello", () => {
    render(<App />);
    const item = {
      id: "cc8a6b78-5c57-47cf-b84b-c1b113b09a3b",
      task: "Hello",
    };
    const testId = `edit-task-${item.id}`;
    const cell = screen.getByTestId(testId);
    const taskField = screen.getByPlaceholderText("Add a Task...");

    fireEvent.click(cell);
    expect(taskField.value).toMatch(item.task);
  });

  test("when i click on edit button text must be 'Update'", async () => {
    render(<App />);
    const item = {
      id: "cc8a6b78-5c57-47cf-b84b-c1b113b09a3b",
      task: "Hello",
    };
    const testId = `edit-task-${item.id}`;
    const cell = screen.getByTestId(testId);
    const taskField = screen.getByPlaceholderText("Add a Task...");

    fireEvent.click(cell);
    const buttonList = await screen.findAllByRole("button");
    const updateButton = buttonList.find((button) =>
      button.textContent.includes("Update")
    );
    expect(updateButton).toBeInTheDocument();
  });
});
