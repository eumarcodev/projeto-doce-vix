import { UserPrismaFactory } from "../../factories/UserPrismaFactory";
import { UserPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUsecase } from "./UpdateUserUseCase";

import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";
import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";
import { UpdateUserService } from "../../services/usersServices/UpdateUserService";
import { UpdateUserValidator } from "../../services/usersServices/validation/UpdateUserValidator";

const cryptographyAdapter: ICriptography = new BcryptAdapter();
const userFactory = new UserPrismaFactory();
const userRepository = new UserPrismaRepository(userFactory);
const updateUserValidator = new UpdateUserValidator(
    userRepository,
);
const updateUserService = new UpdateUserService(
    updateUserValidator,
    userRepository,
    cryptographyAdapter,
);
const updateUserUseCase = new UpdateUserUsecase(updateUserService);
const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController };

