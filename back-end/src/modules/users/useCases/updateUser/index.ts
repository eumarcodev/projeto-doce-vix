import { UserPrismaFactory } from "../../factories/UserPrismaFactory";
import { UserPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { UpdateUserUsecase } from "./UpdateUserUseCase";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserValidator } from "../../services/validation/UpdateUserValidator";
import { UpdateUserService } from "../../services/usersServices/UpdateUserService";
import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";
import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";

const cryptographyAdapter: ICriptography = new BcryptAdapter();
const userFactory = new UserPrismaFactory();
const userRepository = new UserPrismaRepository(userFactory);
const updateUserValidator = new UpdateUserValidator(
    userRepository,
    cryptographyAdapter,
);
const updateUserService = new UpdateUserService(
    updateUserValidator,
    userRepository,
    cryptographyAdapter,
);
const updateUserUseCase = new UpdateUserUsecase(updateUserService);
const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController };
