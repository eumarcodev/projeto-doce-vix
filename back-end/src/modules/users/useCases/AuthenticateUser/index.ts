import { UserPrismaFactory } from "../../factories/UserPrismaFactory";
import { UserPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUsecase";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthUserValidator } from "../../services/validation/AuthUserValidator";
import { AuthUserService } from "../../services/AuthUserService";
import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";
import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";

const cryptographyAdapter: ICriptography = new BcryptAdapter();
const userFactory = new UserPrismaFactory();
const userRepository = new UserPrismaRepository(userFactory);
const authUserValidator = new AuthUserValidator(
    userRepository,
    cryptographyAdapter,
);
const authUserService = new AuthUserService(authUserValidator, userRepository);

const authUserUseCase = new AuthenticateUserUseCase(authUserService);
const authUserController = new AuthenticateUserController(authUserUseCase);

export { authUserController };
