export interface IService<T_PARMS, T_ENTITY> {
    execute(data: T_PARMS): Promise<T_ENTITY>;
}

