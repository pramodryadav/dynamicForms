import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import ErrorPage from './pages/Error';
import Home from './pages/Home';
import ProtectedRoutes from './protecteRoutes';



const router = createBrowserRouter([

  {
    path: "/",
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Home /> },
        
         
          /* the rest of the routes */
        ],
      }, 
    ],
  },

  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
 
  {
    path: '/about',
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path:"*",
    element:<PageNotFound/>,
    errorElement: <ErrorPage />,
}
],
{basename:"/docqfacts",
}
);

export default function Router() {
  return <RouterProvider router={router} />
}