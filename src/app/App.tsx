import {Main} from "pages/Main";
import {Palette} from "pages/Palette";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Path} from "app/types/app.ts";
import classNames from "classnames";
import './styles/index.scss'


export const App  = () => {
  const router = createBrowserRouter([
    {
      path: Path.MAIN,
      element: <Main />,
    },
    {
      path: `${Path.PALETTE}:paletteId`,
      element: <Palette />
    }
  ]);

  return (
    <>
      <div className={classNames('app')}>
        <RouterProvider router={router} />
      </div>
    </>
  );
}