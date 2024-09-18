import { TypeEmpresa } from '@/types/empresas';
import { useEffect, useState } from 'react';
import { TypeTrabajos } from '@/types/trabajos';
import trabajosLib from '@/lib/trabajos';
import { Link } from 'react-router-dom';

export const Empresa2 = ({ empresa }: { empresa: TypeEmpresa }) => {
  const [trabajos, getTrabajos] = useState<TypeTrabajos[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await trabajosLib.obtenerTrabajosPorEmpresa(empresa.id);

        if (response.status === 200) {
          getTrabajos(response.data);
        }
      } catch {
        // eslint-disable-next-line no-console
        console.log('error');
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-12 max-w-[70%] mx-auto">
      <div className="flex justify-center">
        <Link to={`/crear-trabajo/${empresa.id}`} className='bg-principal-600 text-white p-2 rounded-sm font-semibold'>Crear trabajo</Link>
      </div>
      <div>
        {
          trabajos.length === 0 ? (
            <h3 className='font-bold text-center text-xl mt-8'>Sin ofertas públicadas</h3> 
          ) : <h3>trabajos</h3>
        }
      </div>
    </div>
  );
};
