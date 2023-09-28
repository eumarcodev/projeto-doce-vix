import { Router } from "express";
import { listDayOfWeekController } from "@/modules/dayOfWeek/useCases/listDayOfWeek";

const dayOfWeekRoutes = Router();

dayOfWeekRoutes.get("/", (request, response, next) => {
    return listDayOfWeekController.handle(request, response, next);
});

export { dayOfWeekRoutes };
