import ModalRename from "./ModalRename";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";

const call = vi.fn(() => true);
vi.mock("@/hooks/useApi", () => ({
  useDelayApi: () => ({
    call: call,
    loaded: true,
    error: null,
    loading: false,
  }),
}));

vi.mock("@/toolkit/Components/Loader", () => ({
  default: ({ children }: any) => <div className="Loader">{children}</div>,
}));

const template = {
  id: "1",
  name: "",
  title: "test",
  createDate: "01/02/2002",
  modifyDate: "01/02/2002",
  bookmarked: false,
  webUrl: "",
  tags: [],
};

vi.spyOn(console, "error").mockImplementation(() => {});

const onResolve = vi.fn();
const onReject = vi.fn();

/* Test start */
describe("ModalRename", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("render ModalRename", () => {
    render(<ModalRename template={template} onResolve={onResolve} onReject={onReject} />);
    expect(screen.getByText("Nom du modèle : test")).toBeTruthy();
    expect(screen.getByDisplayValue("test")).toBeTruthy();
  });

  test("expect api called and onResolved call", async () => {
    render(<ModalRename template={template} onResolve={onResolve} onReject={onReject} />);
    await screen.getByText("Enregistrer").click();
    await expect(call).toHaveBeenCalled();
    await expect(onResolve).toHaveBeenCalled();
  });

  test("expect api called and onReject call", async () => {
    call.mockImplementation(() => {
      throw new Error("cancel");
    });
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<ModalRename template={template} onResolve={onResolve} onReject={onReject} />);
    await screen.getByText("Enregistrer").click();
    await expect(onReject).toHaveBeenCalledWith(new Error("cancel"));
  });
});
