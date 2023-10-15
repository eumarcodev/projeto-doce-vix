import { TokenProvider } from "@/shared/infra/adapters/cryptography/implementations/TokenServiceImplementation";
import { RefreshTokenPrismaFactory } from "../../factories/RefreshTokenPrismaFactory";
import { RefreshTokenPrismaRepository } from "../../repositories/implementations/RepreshTokenPrismaRepository";
import { RefreshTokenService } from "../../services/tokenServices/RefreshTokenService";
import { RefreshTokenUserController } from "./RefreshTokenUserController";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

const tokenProvider = new TokenProvider();

const refreshFactory = new RefreshTokenPrismaFactory();
const refreshRepository = new RefreshTokenPrismaRepository(refreshFactory);
const refreshTokenService = new RefreshTokenService(
    refreshRepository,
    tokenProvider,
);

const refreshTokenUseCase = new RefreshTokenUserUseCase(refreshTokenService);
const refreshTokenController = new RefreshTokenUserController(
    refreshTokenUseCase,
);

export { refreshTokenController };

