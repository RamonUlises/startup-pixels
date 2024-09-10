import { Colaborador1 } from '@/Components/Registros/colaborador/Colaborador1';
import { Colaborador2 } from '@/Components/Registros/colaborador/Colaborador2';
import { TypeColaboradores } from '@/types/colaboradores';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useState } from 'react';

export const RegistroColaborador = () => {
  const [tab, setTab] = useState<number>(1);
  const [colaborador, setColaborador] = useState<TypeColaboradores>({
    id: '1',
    nombres: '',
    usuario: '',
    telefono: '',
    email: '',
    contrasena: '',
    'redes-sociales': [],
    imagen: '',
    descripcion: '',
    'educacion-primaria': false,
    'educacion-secundaria': false,
    titulos: [],
    idiomas: [],
    certificados: [],
    referencias: [],
    habilidades: [],
    puntos: 0,
    puntuacion: 0,
    saldo: 0,
  });

  const nextTab = (num: number) => {
    setTab(num);
  };

  const registrarColaborador = () => {
    alert('Colaborador registrado');
  };

  console.log(colaborador);

  return (
    <>
      <main className="flex flex-col h-screen items-center px-3 overflow-y-auto overflow-x-hidden bg-gradient-to-tr dark:from-zinc-800 dark:to-zinc-700">
        <h2 className="my-4 font-bold text-xl  dark:text-white">Regístrate</h2>
        <Tabs
          value={tab === 1 ? 'info-1' : 'info-2'}
          defaultValue="info-1"
          className="w-full bg-slate-100 shadow-xl drop-shadow-md p-4 max-w-[900px] dark:bg-zinc-800 rounded-xl"
        >
          <TabsList className="flex justify-center mb-4 items-center sm:gap-4 gap-2">
            <TabsTrigger
              className={`text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full ${
                tab === 1
                  ? 'bg-principal-600 dark:text-black dark:bg-white'
                  : 'bg-slate-400 dark:text-white dark:bg-zinc-700'
              }`}
              value="info-1"
              onClick={() => setTab(1)}
            >
              1
            </TabsTrigger>
            <div className="w-full max-w-[120px] h-1 bg-principal-600 dark:bg-zinc-600"></div>
            <TabsTrigger
              className={`text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full ${
                tab === 2
                  ? 'bg-principal-600 dark:text-black dark:bg-white'
                  : 'bg-slate-400 dark:text-white dark:bg-zinc-700'
              }`}
              value="info-2"
              onClick={() => setTab(2)}
            >
              2
            </TabsTrigger>
          </TabsList>
          <TabsContent value="info-1">
            <Colaborador1
              colaborador={colaborador}            
              setColaborador={setColaborador}
              nextTab={nextTab}
            />
          </TabsContent>
          <TabsContent value="info-2">
            <Colaborador2
              colaborador={colaborador}
              setColaborador={setColaborador}
              registrar={registrarColaborador}
              nextTab={nextTab}
            />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};
