import IComercio from '../../Interfaces/IComercio';

class ComercioSingleton {
  private static instance: ComercioSingleton;
  private comercio: IComercio | null;

  private constructor() {
    this.comercio = null;
  }

  static getInstance(): ComercioSingleton {
    if (!ComercioSingleton.instance) {
      ComercioSingleton.instance = new ComercioSingleton();
    }
    return ComercioSingleton.instance;
  }

  setComercio(comercio: IComercio | null) {
    this.comercio = comercio;
  }

  getComercio(): IComercio | null {
    return this.comercio;
  }

  getNombreComercio() : String | null | undefined {
    return this.comercio?.nombre;
  }
}

const comercioSingleton = ComercioSingleton.getInstance();
export default comercioSingleton;
