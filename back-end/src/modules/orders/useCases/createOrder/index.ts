import { OrderPrismaFactory } from "../../factories/OrderPrismaFactory";
import { OrderPrismaRepository } from "../../repositories/implementations/OrderPrismaRepository";
import { CreateOrderController } from "./CreateOrderController";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

const orderPrismaFactory = new OrderPrismaFactory();
const orderPrismaRepository = new OrderPrismaRepository(orderPrismaFactory);
const createOrderUseCase = new CreateOrderUseCase(orderPrismaRepository);
const createOrderController = new CreateOrderController(createOrderUseCase);

export { createOrderController };
