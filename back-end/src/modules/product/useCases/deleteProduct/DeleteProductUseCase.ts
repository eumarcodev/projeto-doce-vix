import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { IProduct } from "../../model/IProduct";
import { DeleteProcutService } from "../../services/DeleteProductService";

export class DeleteProductUseCase implements IUseCase<string, IProduct> {
    constructor(private readonly deleteProductService: DeleteProcutService) {}

    async execute(data: string): Promise<IProduct> {
        return this.deleteProductService.execute(data);
    }
}
