import { IFilters } from './filters/filters';
import { IEnumerable } from './../linq/enumerable';
export { IEnumerable };
export interface IBaseRepository<TEntity, TEntityId> {
    create(entity: TEntity): Promise<TEntity>;
    read(id: TEntityId): Promise<TEntity>;
    readAll(query: IEnumerable<TEntity>): Promise<TEntity[]>;
    update(entity: TEntity): Promise<boolean>;
    delete(entity: TEntity): Promise<boolean>;
}
declare abstract class BaseRepository<TEntity, TEntityId> implements IBaseRepository<TEntity, TEntityId> {
    constructor();
    abstract read(id: TEntityId): Promise<TEntity>;
    abstract readAll(query: IEnumerable<TEntity>): Promise<TEntity[]>;
    abstract create(entity: TEntity): Promise<TEntity>;
    abstract update(entity: TEntity): Promise<boolean>;
    abstract delete(entity: TEntity): Promise<boolean>;
    beginTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    /**
     * returns a IFilters if the predicate is solvable, otherwise it throws an error
     * @param predicate
     * @param parameters
     */
    protected getFilters(query: IEnumerable<TEntity>): IFilters;
    getPredicateFn(query: IEnumerable<TEntity>): (element: TEntity) => boolean;
}
export default BaseRepository;
