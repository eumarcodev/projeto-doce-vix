import { createOrderController } from "@/modules/orders/useCases/createOrder";
import { createOrderItemController } from "@/modules/orders/useCases/createOrderItem";
import { listOrdersController } from "@/modules/orders/useCases/listOrders";
import { Router } from "express";

const orderItemRouter = Router()

orderItemRouter.post("/", (request, response, next) => {
    return createOrderItemController.handle(request, response, next);
});





const orderRouter = Router()

orderRouter.post("/", (request, response, next) => {
    return createOrderController.handle(request, response, next);
});

orderRouter.get("/", (request, response, next) => {
    return listOrdersController.handle(request, response, next);
});

export { orderItemRouter, orderRouter };

