import { ICat } from "./../types/cat";
import Cat from "./../models/cat";

interface CatRepo {
  getCats(): Promise<Array<ICat>>;
  addCat(catBody: ICat): Promise<ICat>;
  updateCat(id: string, catBody: ICat): Promise<ICat | null>;
  deleteCat(id: string): Promise<ICat | null>;
}

class CatRepoImpl implements CatRepo {
  private constructor() {}

  static of(): CatRepoImpl {
    return new CatRepoImpl();
  }

  async getCats(): Promise<Array<ICat>> {
    return Cat.find();
  }

  async addCat(catBody: ICat): Promise<ICat> {
    return Cat.create(catBody);
  }
  async updateCat(id: string, catBody: ICat): Promise<ICat | null> {
    return Cat.findByIdAndUpdate(id, catBody, { new: true });
  }

  async deleteCat(id: string): Promise<ICat | null> {
    return Cat.findByIdAndDelete(id);
  }
}

export { CatRepoImpl };
