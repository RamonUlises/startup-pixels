import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ChangeTheme } from './ChangeTheme';
import loader from '../assets/loader-menu.svg';
import { obtenerCookie } from '../utils/cookies';
import { TypeColaboradores } from '../types/colaboradores';
import { TypeEmpresa } from '../types/empresas';
import { obtenerInfo } from '../lib/obtenerInfo';
import { User } from 'lucide-react';

type StateMenu = 'logueando' | 'logueado' | 'deslogueado';

export const MenuDesktop = () => {
  const [state, setState] = useState<StateMenu>('deslogueado');
  const [user, setUser] = useState<TypeColaboradores | TypeEmpresa>(
    {} as TypeColaboradores | TypeEmpresa
  );

  useEffect(() => {
    const user = obtenerCookie('UserId');
    if (user) {
      (async () => {
        const info = await obtenerInfo(user);
        setUser(info.data[0]);
      })();
      setState('logueado');
      return;
    }

    const path = window.location.pathname;

    if (path === '/login') {
      setState('logueando');
    }
  }, []);

  return (
    <>
      <header className="fixed justify-between hidden w-full p-4 text-white bg-transparent md:flex">
        <section className="flex items-center md:gap-6 lg:gap-10 bg-gradient-to-tl from-[#E75F0B] dark:from-zinc-800 to-[#C3480B] dark:to-zinc-700 px-6 lg:px-10 py-4 rounded-lg">
          <Link to="/" className="font-bold md:text-xl lg:text-2xl">
            NextStep
          </Link>
          <nav>
            <ul className="flex items-center ml-4 font-medium md:gap-4 lg:gap-6 md:text-sm lg:text-base">
              <li>
                <Link
                  to="/"
                  className="transition-opacity duration-300 hover:opacity-80"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="transition-opacity duration-300 hover:opacity-80"
                >
                  Trabajos
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="transition-opacity duration-300 hover:opacity-80"
                >
                  Colaboradores
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="transition-opacity duration-300 hover:opacity-80"
                >
                  Empresas
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        {state === 'logueado' ? (
          <Logueado nombre={'nombre' in user ? user.nombre : user.usuario} img={user.imagen} />
        ) : (
          <section className="flex justify-center items-center gap-5 bg-gradient-to-tl from-[#E75F0B] dark:from-zinc-800 to-[#C3480B] dark:to-zinc-700 px-6 py-4 rounded-lg">
            {state === 'deslogueado' ? (
              <Deslogueado />
            ) : state === 'logueando' ? (
              <Logueando />
            ) : null}
          </section>
        )}
      </header>
    </>
  );
};

function Logueado({ nombre, img }: { nombre: string; img: string }) {
  if(nombre != undefined){
    if(nombre.length > 10){
      nombre = nombre.slice(0, 6) + '...';
    }
  }

  return (
    <>
      <section className='flex justify-center items-center gap-2'>
        <div className='bg-gradient-to-tl from-[#E75F0B] dark:from-zinc-800 to-[#C3480B] dark:to-zinc-700 px-4 lg:px-6 py-3 rounded-lg'>
          <ChangeTheme />
        </div>
        <div className='bg-gradient-to-tl from-[#E75F0B] dark:from-zinc-800 to-[#C3480B] dark:to-zinc-700 px-4 lg:px-6 py-3 rounded-lg flex items-center gap-2'>
          <h3>{nombre}</h3>
          <div className='w-[35px] h-[35px] rounded-full bg-slate-300 overflow-hidden'>
            {
              img === 'sin-imagen' ? (
                <User width={33} height={33} />
              ) : (
                <img src={img} alt="Image" />
              )
            }
          </div>
        </div>
      </section>
    </>
  );
}

function Logueando() {
  return (
    <>
      <ChangeTheme />
      <img className="w-[35px] h-[35px]" src={loader} alt="" />
    </>
  );
}
function Deslogueado() {
  return (
    <>
      <ChangeTheme />
      <Link
        to="/login"
        className="border-2 border-white before:bg-gradient-to-tl before:from-[#E75F0B] dark:before:from-zinc-800 before:to-[#C3480B] dark:before:to-zinc-700 button-menu outline-none cursor-pointer py-[6px] px-[12px] m-0 relative text-base inline-block rounded-lg overflow-hidden bg-white text-white hover:text-[#E75F0B] dark:hover:text-zinc-700"
      >
        <span className="relative z-20 md:text-sm lg:text-base">Iniciar</span>
      </Link>
    </>
  );
}
