import { Navigate, createBrowserRouter, useRouteError } from "react-router-dom";
import { postListRoute } from "../pages/PostList";
import { userListRoute } from "../pages/UserList";
import { todoListRoute } from "../pages/TodoList";
import { postRoute } from "../pages/Post";
import { userRoute } from "../pages/User";
import { RootLayout } from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/posts" />,
      },
      {
        path: "posts",
        children: [
          { index: true, ...postListRoute },
          { path: ":postId", ...postRoute },
        ],
      },
      {
        path: "users",
        children: [
          { index: true, ...userListRoute },
          { path: ":userId", ...userRoute },
        ],
      },
      {
        path: "todos",
        ...todoListRoute,
      },
    ],
  },
]);

function ErrorBoundary() {
  let error = useRouteError();
  console.error("error: " + error);

  return (
    <>
      <div>{error.statusText}</div>
      <div>{error.status}</div>
    </>
  );
}
