import { Link } from "react-router-dom";

import { IconHome, notfound } from "@assets/index";
import { Button } from "@components/index";

export const NotFound = () => (
  <main
    data-testid="notfound"
    className="flex h-screen flex-col items-center justify-between dark:bg-zinc-900 dark:text-zinc-100"
  >
    <div className="mt-[10rem] flex flex-col items-center justify-center">
      <h2 className="mb-2">Vous allez où comme ça ?</h2>
      <Link to={"/"}>
        <Button primary>
          <IconHome />
          Retour à l'accueil
        </Button>
      </Link>
    </div>

    <img src={notfound} alt="Travolta gif" />
  </main>
);
