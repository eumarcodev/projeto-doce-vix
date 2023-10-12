import { UserPrismaFactory } from "../../factories/UserPrismaFactory";
import { UserPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserValidator } from "../../services/validation/CreateUserValidator";
import { CreateUserService } from "../../services/usersServices/CreateUserService";
import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";

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
