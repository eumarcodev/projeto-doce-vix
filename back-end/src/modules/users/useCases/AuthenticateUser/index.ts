import { UserPrismaFactory } from "../../factories/UserPrismaFactory";
import { UserPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { RefreshTokenPrismaFactory } from "../../factories/RefreshTokenPrismaFactory";
import { RefreshTokenPrismaRepository } from "../../repositories/implementations/RepreshTokenPrismaRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUsecase";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthUserValidator } from "../../services/validation/AuthUserValidator";
import { AuthUserService } from "../../services/usersServices/AuthUserService";
import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";
import { ICriptography } from "@/shared/infra/adapters/cryptography/ICryptography";
import { JwtTokenProvider } from "@/shared/infra/adapters/cryptography/implementations/TokenServiceImplementation";

const tokenProvider = new JwtTokenProvider();

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
