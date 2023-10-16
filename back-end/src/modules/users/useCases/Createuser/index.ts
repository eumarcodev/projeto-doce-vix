import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";
import { UserPrismaFactory } from "../../factories/UserPrismaFactory";
import { UserPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { CreateUserService } from "../../services/usersServices/CreateUserService";
import { CreateUserValidator } from "../../services/usersServices/validation/CreateUserValidator";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const bcryptadapter = new BcryptAdapter();
const userFactory = new UserPrismaFactory();
const userRepository = new UserPrismaRepository(userFactory);
const createUserValidator = new CreateUserValidator(userRepository);
const createUserService = new CreateUserService(
    createUserValidator,
    userRepository,
    bcryptadapter,
);
const createUserUseCase = new CreateUserUseCase(createUserService);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };

