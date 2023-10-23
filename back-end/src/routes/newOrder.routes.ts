import { createOrderController } from "@/modules/orders/useCases/createOrder";
import { listOrdersController } from "@/modules/orders/useCases/listOrders";
import { Router } from "express";

const newOrderRouter = Router()

newOrderRouter.post("/", (request, response, next) => {
    return createOrderController.handle(request, response, next);
});

newOrderRouter.get("/", (request, response, next) => {
    return listOrdersController.handle(request, response, next);
});

export { newOrderRouter };
