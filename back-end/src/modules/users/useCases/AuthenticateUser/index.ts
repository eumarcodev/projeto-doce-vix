import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";
import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";
import { TokenProvider } from "@/shared/infra/adapters/cryptography/implementations/TokenServiceImplementation";
import { RefreshTokenPrismaFactory } from "../../factories/RefreshTokenPrismaFactory";
import { UserPrismaFactory } from "../../factories/UserPrismaFactory";
import { RefreshTokenPrismaRepository } from "../../repositories/implementations/RepreshTokenPrismaRepository";
import { UserPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { AuthUserService } from "../../services/usersServices/AuthUserService";
import { AuthUserValidator } from "../../services/validation/AuthUserValidator";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUsecase";

const tokenProvider = new TokenProvider();

const cryptographyAdapter: ICriptography = new BcryptAdapter();
const userFactory = new UserPrismaFactory();
const userRepository = new UserPrismaRepository(userFactory);
const refreshFactory = new RefreshTokenPrismaFactory();
const refreshRepository = new RefreshTokenPrismaRepository(refreshFactory);
const authUserValidator = new AuthUserValidator(
    userRepository,

    cryptographyAdapter,
);
const authUserService = new AuthUserService(
    authUserValidator,
    userRepository,
    refreshRepository,
    tokenProvider,
);

const authUserUseCase = new AuthenticateUserUseCase(authUserService);
const authUserController = new AuthenticateUserController(authUserUseCase);

export { authUserController };

