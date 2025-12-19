import { NotFoundScreen } from "~/app/_components/not-found";

export default function NotFound() {
  return (
    <NotFoundScreen
      message="Item not found"
      buttonProps={{ text: "Back to Menu", route: "/menu-view" }}
    />
  );
}
