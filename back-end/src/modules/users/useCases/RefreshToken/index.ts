import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";
import { RefreshTokenUserController } from "./RefreshTokenUserController";
import { RefreshTokenService } from "../../services/usersServices/RefreshTokenService";
import { RefreshTokenPrismaRepository } from "../../repositories/implementations/RepreshTokenPrismaRepository";
import { RefreshTokenPrismaFactory } from "../../factories/RefreshTokenPrismaFactory";
import { JwtTokenProvider } from "@/shared/infra/adapters/cryptography/implementations/TokenServiceImplementation";

const tokenProvider = new JwtTokenProvider();

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
