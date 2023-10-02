import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IValidator } from "@/shared/infra/protocols/IValidator";

export class DayOfWeekCheckExistsValidator implements IValidator<string> {
    constructor(private readonly repository: any) {}

    async validate(data: string): Promise<void> {
        const exists = await this.repository.findByName(data);
        if (!exists)
            throw new ErrorHandler(
                `${this.repository.name} not found`,
                HttpStatusCode.NOT_FOUND,
            );
    }
}

