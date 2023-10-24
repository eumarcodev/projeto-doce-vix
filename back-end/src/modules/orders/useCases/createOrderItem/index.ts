import { ProductPrismaFactory } from "@/modules/product/factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "@/modules/product/repositories/implementations/ProductRepository";

import { OrderItemPrismaFactory } from "../../factories/OrderItemPrismaFactory";
import { OrderItemPrismaRepository } from "../../repositories/implementations/OrderItemPrismaRepository";
import { CreateOrderItemService } from "../../services/createOrderItemService";
import { CreateOrderValidator } from "../../services/validator/createOrderValidator";
import { CreateOrderItemController } from "./createOrderItemController";
import { CreateOrderItemUseCase } from "./CreateOrderItemUseCase";

const productPrismaFactory = new ProductPrismaFactory();
const productPrismaRepository = new ProductPrismaRepository(
    productPrismaFactory,
);
const orderItemFactory = new OrderItemPrismaFactory();
const orderItemRepository = new OrderItemPrismaRepository(orderItemFactory);
const createOrderValidator = new CreateOrderValidator(productPrismaRepository);
const createOrderItemService = new CreateOrderItemService(
    orderItemRepository,
    createOrderValidator,
);

const createOrderItemUseCase = new CreateOrderItemUseCase(
    createOrderItemService,
);
const createOrderItemController = new CreateOrderItemController(
    createOrderItemUseCase,
);

export { createOrderItemController };
