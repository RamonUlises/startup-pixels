import empresas from '@/schemas/empresas';
import trabajadores from '@/schemas/trabajadores';
import { TypeEmpresa } from '@/types/empresas';
import { TypeTrabajadores } from '@/types/trabajadores';

class Auth {
  async login(email: string) {
    try {
      const empresa: TypeEmpresa[] = await empresas.find({ email });
      const trabajador: TypeTrabajadores[] = await trabajadores.find({ email });

      return { empresa, trabajador };
    } catch {
      throw new Error('Error en la base de datos');
    }
  }
  async recoverPassword(email: string) {
    try {
      const empresa: TypeEmpresa[] = await empresas.find({ email });
      const trabajador: TypeTrabajadores[] = await trabajadores.find({ email });

      return { empresa, trabajador };
    } catch {
      throw new Error('Error en la base de datos');
    }
  }
}

const auth = new Auth();

export default auth;
