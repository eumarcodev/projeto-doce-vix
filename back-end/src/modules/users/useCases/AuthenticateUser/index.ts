import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";
import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";
import { TokenProvider } from "@/shared/infra/adapters/cryptography/implementations/TokenServiceImplementation";

import { UserPrismaFactory } from "../../factories/UserPrismaFactory";
import { UserPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { AuthUserService } from "../../services/usersServices/AuthUserService";
import { AuthUserValidator } from "../../services/usersServices/validation/AuthUserValidator";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUsecase";

const tokenProvider = new TokenProvider();

const cryptographyAdapter: ICriptography = new BcryptAdapter();
const userFactory = new UserPrismaFactory();
const userRepository = new UserPrismaRepository(userFactory);
const authUserValidator = new AuthUserValidator(
    userRepository,

    cryptographyAdapter,
);
const authUserService = new AuthUserService(
    authUserValidator,
    userRepository,
    tokenProvider,
);

const authUserUseCase = new AuthenticateUserUseCase(authUserService);
const authUserController = new AuthenticateUserController(authUserUseCase);

export { authUserController };

