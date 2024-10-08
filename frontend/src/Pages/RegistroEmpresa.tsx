import { Empresa1 } from '@/Components/Registros/Empresa/Empresa1';
import { Empresa2 } from '@/Components/Registros/Empresa/Empresa2';
import empresas from '@/lib/empresas';
import { TypeEmpresa } from '@/types/empresas';
import { validateEmpresa, validationEmpresa } from '@/utils/validateEmpresa';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useState } from 'react';
export const RegistroEmpresa = () => {
  const [tab, setTab] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [empresa, setEmpresa] = useState<TypeEmpresa>({
    id: '1',
    'numero-identificacion': '',
    'certificado-registro': '',
    'licencia-comercial': '',
    nombre: '',
    direccion: [],
    telefono: [],
    email: [],
    contrasena: '',
    'redes-sociales': [],
    mision: '',
    vision: '',
    objetivos: [],
    puntuacion: 0,
    puntuados: 0,
    imagen: 'sin-imagen',
    verificado: false,
    'imagen-2': 'sin-imagen',
    'sitio-web': '',
    'nivel': 1,
  });

  const nextTab = (num: number) => {
    try {
      setError('');
      validationEmpresa(empresa);
      setTab(num);
    } catch (error) {
      setError(error as string);
    }
  };

  const registrar = async () => {
    try {
      setError('');
      validateEmpresa(empresa);
      try {
        const response = await empresas.crearEmpresa(empresa);
        if(response.status === 200){
          setError('Datos enviados');

          setTimeout(() => {
            window.location.href = '/';
          }, 4000);
        }

        return;
      } catch (error) {
        if(error instanceof Error){
          setError('Error al enviar los datos');
        } else if (typeof error === 'object' && error != null && 'data' in error){
          const err = error as { data: { message: string; status: number }};
          setError(err.data.message);
        } else {
          setError('Error al enviar los datos');
        }
      }
    } catch (error) {
      setError(error as string);
    }
  };

  return (
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
            disabled
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
            disabled
          >
            2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info-1">
          <Empresa1
            error={error}
            empresa={empresa}
            setEmpresa={setEmpresa}
            nextTab={nextTab}
          />
        </TabsContent>
        <TabsContent value="info-2">
          <Empresa2
            error={error}
            empresa={empresa}
            setEmpresa={setEmpresa}
            nextTab={nextTab}
            registrar={registrar}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
};
